"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  Download,
  LogOut,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Save,
  Trash2,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type DimensionScore = {
  dimension: string;
  average: number;
  min: number;
  max: number;
};

type Recommendation = {
  title?: string;
  service?: string;
  priority?: string;
  description?: string;
};

type AssessmentRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  whatsapp: string;
  employees: string;
  category: string;
  overallScore: number;
  scores: Record<string, number>;
  aiAnalysis: string;
  recommendations: Recommendation[];
  answers: Record<string, number>;
  assessmentStatus: string;
  resultEmailSentAt: string | null;
  proposalStatus: string;
  proposalRequestedAt: string | null;
  proposalSentAt: string | null;
  createdAt: string;
};

type ContactRecord = {
  id: string;
  recordId: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  source: string;
  sourceType: string;
  category: string;
  status: string;
  notes: string;
  createdAt: string | null;
};

type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string | null;
};

type CoachRecord = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  expertise?: string;
  field?: string;
  status?: string;
  bio?: string;
  category?: string;
  rate?: string;
  availability?: string;
  notes?: string;
  created_at?: string;
};

type CoachAssignmentRecord = {
  id?: string;
  coach_id?: string;
  client_name?: string;
  program_name?: string;
  service?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  notes?: string;
  created_at?: string;
};

type CoachSessionRecord = {
  id?: string;
  coach_id?: string;
  assignment_id?: string;
  session_date?: string;
  duration_minutes?: number;
  topic?: string;
  rating?: number;
  evaluation?: string;
  notes?: string;
  created_at?: string;
};

type CoachAvailabilityRecord = {
  id?: string;
  coach_id?: string;
  day_of_week?: string;
  time_window?: string;
  mode?: string;
  status?: string;
  notes?: string;
  created_at?: string;
};

type CoachDocumentRecord = {
  id?: string;
  coach_id?: string;
  title?: string;
  document_type?: string;
  document_url?: string;
  status?: string;
  expiry_date?: string;
  notes?: string;
  created_at?: string;
};

type DashboardData = {
  generatedAt: string;
  summary: {
    totalAssessments: number;
    avgOverall: number;
    strongestDimension: DimensionScore;
    weakestDimension: DimensionScore;
    mostCommonCategory: string;
    totalContacts: number;
    totalInquiries: number;
    totalCoaches: number;
    totalEmployees?: number;
  };
  dimensionStats: DimensionScore[];
  categoryBreakdown: { category: string; count: number }[];
  employeeStats: { range: string; count: number; avgOverall: number }[];
  answerDistribution: Array<Record<string, number | string>>;
  topRecommendations: { service: string; count: number }[];
  assessments: AssessmentRecord[];
  contacts: ContactRecord[];
  inquiries: InquiryRecord[];
  coaches: CoachRecord[];
  coachAssignments: CoachAssignmentRecord[];
  coachSessions: CoachSessionRecord[];
  coachAvailability: CoachAvailabilityRecord[];
  coachDocuments: CoachDocumentRecord[];
};

const tabs = ["Overview", "Assessment", "Kontak", "Inquiries", "Coach", "HRM"] as const;

const colors = ["#0B2C6B", "#D9A441", "#8FA3C7", "#C86B2B", "#6EA27B", "#B9471D"];

function uniqueOptions<T>(items: T[], getter: (item: T) => string | undefined | null) {
  return Array.from(new Set(items.map(getter).filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b)
  );
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function exportCsv(filename: string, rows: Array<Record<string, string | number | null | undefined>>) {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const [query, setQuery] = useState("");
  const [assessmentCategory, setAssessmentCategory] = useState("Semua");
  const [assessmentEmployeeRange, setAssessmentEmployeeRange] = useState("Semua");
  const [assessmentMinScore, setAssessmentMinScore] = useState("0");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [seenState, setSeenState] = useState({ assessment: "", inquiries: "" });

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const response = await fetch("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await response.json();
    if (!response.ok || !json.success) {
      setError(json.error || "Gagal memuat dashboard admin.");
      setLoading(false);
      if (response.status === 401 || response.status === 403) {
        router.replace("/admin/login");
      }
      return;
    }

    setData(json as DashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSeenState({
      assessment: localStorage.getItem("binahub_admin_seen_assessment") || "",
      inquiries: localStorage.getItem("binahub_admin_seen_inquiries") || "",
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    if (!localStorage.getItem("binahub_admin_seen_assessment")) {
      const latest = data.assessments[0]?.createdAt || new Date().toISOString();
      localStorage.setItem("binahub_admin_seen_assessment", latest);
      setSeenState((current) => ({ ...current, assessment: latest }));
    }

    if (!localStorage.getItem("binahub_admin_seen_inquiries")) {
      const latest = data.inquiries[0]?.createdAt || new Date().toISOString();
      localStorage.setItem("binahub_admin_seen_inquiries", latest);
      setSeenState((current) => ({ ...current, inquiries: latest }));
    }

    if (activeTab === "Assessment") {
      const latest = data.assessments[0]?.createdAt || new Date().toISOString();
      localStorage.setItem("binahub_admin_seen_assessment", latest);
      setSeenState((current) => ({ ...current, assessment: latest }));
    }

    if (activeTab === "Inquiries") {
      const latest = data.inquiries[0]?.createdAt || new Date().toISOString();
      localStorage.setItem("binahub_admin_seen_inquiries", latest);
      setSeenState((current) => ({ ...current, inquiries: latest }));
    }
  }, [activeTab, data]);

  const filteredAssessments = useMemo(() => {
    const search = query.toLowerCase();
    return (data?.assessments || []).filter((item) =>
      [item.name, item.email, item.company, item.role, item.category]
        .join(" ")
        .toLowerCase()
        .includes(search) &&
      (assessmentCategory === "Semua" || item.category === assessmentCategory) &&
      (assessmentEmployeeRange === "Semua" || item.employees === assessmentEmployeeRange) &&
      item.overallScore >= Number(assessmentMinScore || 0)
    );
  }, [assessmentCategory, assessmentEmployeeRange, assessmentMinScore, data, query]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const newAssessmentCount = useMemo(() => {
    if (!data || !seenState.assessment) return data?.assessments.length || 0;
    const seenTime = new Date(seenState.assessment).getTime();
    return data.assessments.filter((item) => new Date(item.createdAt).getTime() > seenTime).length;
  }, [data, seenState.assessment]);

  const newInquiryCount = useMemo(() => {
    if (!data || !seenState.inquiries) return data?.inquiries.length || 0;
    const seenTime = new Date(seenState.inquiries).getTime();
    return data.inquiries.filter((item) => new Date(item.createdAt || 0).getTime() > seenTime).length;
  }, [data, seenState.inquiries]);

  const adminRequest = async (url: string, init?: RequestInit) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) {
      router.replace("/admin/login");
      throw new Error("Sesi admin tidak ditemukan.");
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init?.headers || {}),
      },
    });

    const json = await response.json();
    if (!response.ok || !json.success) {
      throw new Error(json.error || "Aksi admin gagal.");
    }

    return json;
  };

  return (
    <>
      <style>{`#global-navbar, footer { display: none !important; } body { background: #F5F7FA; }`}</style>
      <main className="min-h-screen bg-[#F5F7FA] text-[#0B2C6B]">
        <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-black/[0.06] bg-[#071B3D] px-5 py-6 text-white lg:block">
          <div className="mb-10">
            <div className="relative flex h-11 w-40 items-center rounded-[10px] bg-white px-3">
              <Image src="/full-logo.png" alt="BinaHub" fill className="object-contain object-left px-3 py-2" />
            </div>
            <h1 className="mt-3 text-2xl font-light tracking-[-0.04em]">Intelligence Hub</h1>
          </div>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-left text-sm transition ${
                  activeTab === tab
                    ? "bg-white text-[#0B2C6B]"
                    : "text-white/62 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab}
                  {tab === "Assessment" && newAssessmentCount > 0 && <NotificationBadge count={newAssessmentCount} />}
                  {tab === "Inquiries" && newInquiryCount > 0 && <NotificationBadge count={newInquiryCount} />}
                </span>
                {activeTab === tab && <ArrowRight size={15} className="text-[#D9A441]" />}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-5 right-5 flex items-center justify-center gap-2 rounded-[12px] border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/58 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={15} /> Keluar
          </button>
        </aside>

        <section className="lg:pl-72">
          <header className="sticky top-0 z-20 border-b border-black/[0.06] bg-[#F5F7FA]/95 px-5 py-4 backdrop-blur-sm md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D9A441]">
                  Admin Dashboard
                </p>
                <h2 className="mt-1 text-2xl font-light tracking-[-0.04em] md:text-3xl">
                  Rekap Assessment & Klien
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={activeTab}
                  onChange={(event) => setActiveTab(event.target.value as (typeof tabs)[number])}
                  className="rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm lg:hidden"
                >
                  {tabs.map((tab) => (
                    <option key={tab}>{tab}</option>
                  ))}
                </select>
                <button
                  onClick={fetchDashboard}
                  className="flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0B2C6B]"
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
              </div>
            </div>
          </header>

          <div className="p-5 md:p-8">
            {error && (
              <div className="mb-6 rounded-[12px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading || !data ? (
              <DashboardSkeleton />
            ) : (
              <>
                {activeTab === "Overview" && <Overview data={data} />}
                {activeTab === "Assessment" && (
                  <AssessmentPanel
                    data={data}
                    records={filteredAssessments}
                    query={query}
                    setQuery={setQuery}
                    category={assessmentCategory}
                    setCategory={setAssessmentCategory}
                    employeeRange={assessmentEmployeeRange}
                    setEmployeeRange={setAssessmentEmployeeRange}
                    minScore={assessmentMinScore}
                    setMinScore={setAssessmentMinScore}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    onAction={adminRequest}
                    onRefresh={fetchDashboard}
                  />
                )}
                {activeTab === "Kontak" && (
                  <ContactsPanel contacts={data.contacts} onAction={adminRequest} onRefresh={fetchDashboard} />
                )}
                {activeTab === "Inquiries" && (
                  <InquiriesPanel inquiries={data.inquiries} onAction={adminRequest} onRefresh={fetchDashboard} />
                )}
                {activeTab === "Coach" && (
                  <CoachPanel
                    mode="coach"
                    coaches={data.coaches}
                    onAction={adminRequest}
                    onRefresh={fetchDashboard}
                  />
                )}
                {activeTab === "HRM" && (
                  <CoachPanel
                    mode="hrm"
                    coaches={data.coaches}
                    assignments={data.coachAssignments || []}
                    sessions={data.coachSessions || []}
                    availability={data.coachAvailability || []}
                    documents={data.coachDocuments || []}
                    onAction={adminRequest}
                    onRefresh={fetchDashboard}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function Overview({ data }: { data: DashboardData }) {
  const summaryCards = [
    { label: "Total Assessment", value: data.summary.totalAssessments, icon: Activity },
    { label: "Rata-rata Skor", value: `${data.summary.avgOverall}%`, icon: BarChart3 },
    { label: "Kontak Klien", value: data.summary.totalContacts, icon: Mail },
    { label: "Inquiry Masuk", value: data.summary.totalInquiries, icon: Phone },
    { label: "Coach Terdaftar", value: data.summary.totalCoaches, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-[14px] border border-black/[0.05] bg-white p-6 shadow-[0_16px_50px_-44px_rgba(11,44,107,0.3)]">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#F5F7FA] text-[#0B2C6B]">
              <card.icon size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/38">{card.label}</p>
            <p className="mt-2 text-4xl font-light tracking-[-0.05em]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Skor Rata-rata per Dimensi" action="Radar-style view">
          <div className="grid gap-3">
            {data.dimensionStats.map((item) => (
              <MetricBar key={item.dimension} label={item.dimension} value={item.average} />
            ))}
          </div>
        </Panel>

        <Panel title="Kategori Assessment" action={data.summary.mostCommonCategory}>
          <div className="space-y-3">
            {data.categoryBreakdown.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between gap-4 rounded-[12px] bg-[#F5F7FA] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <span className="text-sm font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Skor berdasarkan Ukuran Perusahaan" action="Company size">
          <div className="space-y-3">
            {data.employeeStats.map((item) => (
              <MetricBar key={item.range} label={`${item.range} (${item.count})`} value={item.avgOverall} />
            ))}
          </div>
        </Panel>

        <Panel title="Layanan Paling Sering Direkomendasikan" action="Demand signal">
          <div className="space-y-3">
            {data.topRecommendations.slice(0, 8).map((item, index) => (
              <div key={item.service} className="flex items-center justify-between border-b border-black/[0.05] pb-3 last:border-0">
                <span className="text-sm font-medium">{item.service}</span>
                <span className="rounded-full bg-[#D9A441]/12 px-3 py-1 text-xs font-bold text-[#9B6C17]">
                  {item.count}x
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function AssessmentPanel({
  data,
  records,
  query,
  setQuery,
  category,
  setCategory,
  employeeRange,
  setEmployeeRange,
  minScore,
  setMinScore,
  expandedId,
  setExpandedId,
  onAction,
  onRefresh,
}: {
  data: DashboardData;
  records: AssessmentRecord[];
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  employeeRange: string;
  setEmployeeRange: (value: string) => void;
  minScore: string;
  setMinScore: (value: string) => void;
  expandedId: string | null;
  setExpandedId: (value: string | null) => void;
  onAction: (url: string, init?: RequestInit) => Promise<unknown>;
  onRefresh: () => Promise<void>;
}) {
  const categories = uniqueOptions(data.assessments, (item) => item.category);
  const employeeRanges = uniqueOptions(data.assessments, (item) => item.employees);
  const [actionError, setActionError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const runAssessmentAction = async (record: AssessmentRecord, action: string) => {
    setActionError("");
    setActionId(`${record.id}:${action}`);
    try {
      await onAction("/api/admin/assessments", {
        method: "POST",
        body: JSON.stringify({ id: record.id, action }),
      });
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal menjalankan tindakan assessment.");
    } finally {
      setActionId(null);
    }
  };

  const saveAssessmentStatus = async (record: AssessmentRecord, assessmentStatus: string, proposalStatus: string) => {
    setActionError("");
    setActionId(`${record.id}:status`);
    try {
      await onAction("/api/admin/assessments", {
        method: "PATCH",
        body: JSON.stringify({ id: record.id, assessmentStatus, proposalStatus }),
      });
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal memperbarui status assessment.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      {actionError && <AdminNotice>{actionError}</AdminNotice>}
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_150px_auto]">
        <div className="relative max-w-md flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama, email, perusahaan, kategori..."
            className="h-12 w-full rounded-[12px] border border-black/10 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#D9A441]"
          />
        </div>
        <AdminSelect value={category} onChange={setCategory} options={["Semua", ...categories]} />
        <AdminSelect value={employeeRange} onChange={setEmployeeRange} options={["Semua", ...employeeRanges]} />
        <AdminSelect
          value={minScore}
          onChange={setMinScore}
          options={[
            ["0", "Skor 0+"],
            ["50", "Skor 50+"],
            ["70", "Skor 70+"],
            ["85", "Skor 85+"],
          ]}
        />
        <button
          onClick={() =>
            exportCsv(
              "binahub-assessments.csv",
              records.map((item) => ({
                name: item.name,
                email: item.email,
                company: item.company,
                role: item.role,
                employees: item.employees,
                category: item.category,
                overallScore: item.overallScore,
                createdAt: item.createdAt,
              }))
            )
          }
          className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-xs font-bold uppercase tracking-[0.14em]"
        >
          <Download size={15} /> CSV
        </button>
      </div>

      <Panel title="Distribusi Jawaban Q1-Q49" action="Likert 1-5">
        <div className="grid grid-cols-7 gap-1 md:grid-cols-[repeat(14,minmax(0,1fr))] xl:grid-cols-[repeat(49,minmax(0,1fr))]">
          {data.answerDistribution.map((item) => {
            const total = [1, 2, 3, 4, 5].reduce((sum, key) => sum + Number(item[String(key)] || 0), 0);
            const positive = Number(item["4"] || 0) + Number(item["5"] || 0);
            const percent = total ? Math.round((positive / total) * 100) : 0;
            return (
              <div key={String(item.question)} className="h-20 rounded-[6px] bg-[#EDF1F6] p-1">
                <div className="flex h-full items-end">
                  <div
                    className="w-full rounded-[4px] bg-[#0B2C6B]"
                    style={{ height: `${Math.max(percent, 4)}%` }}
                    title={`${item.question}: ${percent}% setuju/sangat setuju`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="overflow-hidden rounded-[14px] border border-black/[0.06] bg-white">
        <div className="grid grid-cols-[1.25fr_1fr_0.75fr_0.65fr_44px] border-b border-black/[0.06] bg-[#FAFAF8] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-black/42">
          <span>Klien</span>
          <span>Perusahaan</span>
          <span>Status</span>
          <span>Skor</span>
          <span />
        </div>
        {records.map((record) => {
          const isOpen = expandedId === record.id;
          return (
            <div key={record.id} className="border-b border-black/[0.05] last:border-0">
              <button
                onClick={() => setExpandedId(isOpen ? null : record.id)}
                className="grid w-full grid-cols-[1.25fr_1fr_0.75fr_0.65fr_44px] items-center gap-4 px-5 py-4 text-left transition hover:bg-[#F8FAFC]"
              >
                <span>
                  <span className="block text-sm font-semibold text-[#0B2C6B]">{record.name}</span>
                  <span className="text-xs text-black/42">{record.email}</span>
                </span>
                <span className="text-sm text-black/62">{record.company}</span>
                <span>
                  <span className="block text-sm font-medium text-[#0B2C6B]">{record.assessmentStatus}</span>
                  <span className="text-xs text-black/42">{record.proposalStatus}</span>
                </span>
                <span className="text-2xl font-light tracking-[-0.04em]">{record.overallScore}</span>
                <ChevronDown size={17} className={`transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="grid gap-6 bg-[#FAFAF8] px-5 py-6 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-[12px] border border-black/[0.05] bg-white p-5">
                    <h4 className="mb-4 text-sm font-semibold">Skor Dimensi</h4>
                    <div className="space-y-3">
                      {Object.entries(record.scores)
                        .filter(([key]) => key !== "overall")
                        .map(([dimension, value]) => (
                          <MetricBar key={dimension} label={dimension} value={Number(value)} />
                        ))}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="rounded-[12px] border border-black/[0.05] bg-white p-5">
                      <h4 className="mb-3 text-sm font-semibold">Tindakan Assessment</h4>
                      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                        <AdminSelect
                          value={record.assessmentStatus}
                          onChange={(value) => saveAssessmentStatus(record, value, record.proposalStatus)}
                          options={[
                            "Result Otomatis Terkirim",
                            "Result Email Terkirim",
                            "Minta Proposal",
                            "Proposal Terkirim",
                            "Follow Up",
                            "Closed",
                          ]}
                        />
                        <AdminSelect
                          value={record.proposalStatus}
                          onChange={(value) => saveAssessmentStatus(record, record.assessmentStatus, value)}
                          options={["Belum Diminta", "Diminta", "Sedang Disusun", "Terkirim", "Revisi", "Closed"]}
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => runAssessmentAction(record, "resend_result")}
                            disabled={actionId === `${record.id}:resend_result`}
                            className="h-12 rounded-[10px] border border-black/10 bg-white px-3 text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-50"
                          >
                            Kirim Result
                          </button>
                          <button
                            onClick={() => runAssessmentAction(record, "request_proposal")}
                            disabled={actionId === `${record.id}:request_proposal`}
                            className="h-12 rounded-[10px] border border-[#D9A441]/40 bg-[#FFF8EA] px-3 text-xs font-bold uppercase tracking-[0.12em] text-[#9B6C17] disabled:opacity-50"
                          >
                            Minta Proposal
                          </button>
                          <button
                            onClick={() => runAssessmentAction(record, "send_proposal")}
                            disabled={actionId === `${record.id}:send_proposal`}
                            className="h-12 rounded-[10px] bg-[#0B2C6B] px-3 text-xs font-bold uppercase tracking-[0.12em] text-white disabled:opacity-50"
                          >
                            Kirim Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold">Analisis AI</h4>
                      <p className="text-sm font-light leading-relaxed text-black/58">
                        {record.aiAnalysis || "Belum ada analisis AI."}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-semibold">Rekomendasi</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {record.recommendations.map((rec, index) => (
                          <div key={`${record.id}-${index}`} className="rounded-[12px] border border-black/[0.05] bg-white p-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D9A441]">
                              {rec.service || "Service"}
                            </span>
                            <p className="mt-2 text-sm font-semibold">{rec.title}</p>
                            <p className="mt-2 text-xs leading-relaxed text-black/52">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContactsPanel({
  contacts,
  onAction,
  onRefresh,
}: {
  contacts: ContactRecord[];
  onAction: (url: string, init?: RequestInit) => Promise<unknown>;
  onRefresh: () => Promise<void>;
}) {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { status: string; notes: string }>>({});
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [sourceType, setSourceType] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  const filteredContacts = useMemo(() => {
    const keyword = search.toLowerCase();
    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.whatsapp, contact.category, contact.status, contact.source]
        .join(" ")
        .toLowerCase()
        .includes(keyword) &&
      (sourceType === "Semua" || contact.sourceType === sourceType) &&
      (category === "Semua" || contact.category === category) &&
      (status === "Semua" || contact.status === status)
    );
  }, [category, contacts, search, sourceType, status]);

  const sourceOptions = uniqueOptions(contacts, (contact) => contact.sourceType);
  const categoryOptions = uniqueOptions(contacts, (contact) => contact.category);
  const statusOptions = uniqueOptions(contacts, (contact) => contact.status);

  const getDraft = (contact: ContactRecord) =>
    drafts[contact.id] || { status: contact.status || "New Lead", notes: contact.notes || "" };

  const saveContact = async (contact: ContactRecord) => {
    if (contact.sourceType !== "lead") return;
    setSavingId(contact.id);
    setActionError("");
    try {
      await onAction("/api/admin/contacts", {
        method: "PATCH",
        body: JSON.stringify({ id: contact.recordId, ...getDraft(contact) }),
      });
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal memperbarui kontak.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <Panel title="Master Database Kontak" action={`${filteredContacts.length}/${contacts.length} records`}>
      {actionError && <AdminNotice>{actionError}</AdminNotice>}
      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_160px_180px_160px]">
        <AdminSearch value={search} onChange={setSearch} placeholder="Cari nama, email, telepon, kategori..." />
        <AdminSelect value={sourceType} onChange={setSourceType} options={["Semua", ...sourceOptions]} />
        <AdminSelect value={category} onChange={setCategory} options={["Semua", ...categoryOptions]} />
        <AdminSelect value={status} onChange={setStatus} options={["Semua", ...statusOptions]} />
      </div>
      <div className="grid gap-3">
        {filteredContacts.map((contact) => (
          <div key={`${contact.source}-${contact.id}`} className="rounded-[12px] border border-black/[0.05] bg-[#FCFCFB] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-base font-semibold">{contact.name}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-black/48">
                  <span className="flex items-center gap-1"><Mail size={13} /> {contact.email}</span>
                  {contact.whatsapp && <span className="flex items-center gap-1"><Phone size={13} /> {contact.whatsapp}</span>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{contact.category}</Badge>
                <Badge>{contact.sourceType}</Badge>
                <Badge tone="gold">{getDraft(contact).status}</Badge>
              </div>
            </div>
            {contact.message && <p className="mt-4 text-sm font-light leading-relaxed text-black/58">{contact.message}</p>}
            {contact.sourceType === "lead" && (
              <div className="mt-5 grid gap-3 lg:grid-cols-[180px_1fr_auto]">
              <select
                value={getDraft(contact).status}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [contact.id]: { ...getDraft(contact), status: event.target.value },
                  }))
                }
                className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
              >
                <option>New Lead</option>
                <option>Follow Up</option>
                <option>Qualified</option>
                <option>Client</option>
                <option>Archived</option>
              </select>
              <input
                value={getDraft(contact).notes}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [contact.id]: { ...getDraft(contact), notes: event.target.value },
                  }))
                }
                placeholder="Catatan internal kontak..."
                className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
              />
              <div className="flex gap-2">
                <a href={`mailto:${contact.email}`} className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                  <Mail size={15} />
                </a>
                {contact.whatsapp && (
                  <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                    <Phone size={15} />
                  </a>
                )}
                <button
                  onClick={() => saveContact(contact)}
                  disabled={savingId === contact.id}
                  className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#0B2C6B] text-white disabled:opacity-50"
                >
                  <Save size={15} />
                </button>
              </div>
              </div>
            )}
            {contact.sourceType !== "lead" && (
              <div className="mt-5 flex gap-2">
                <a href={`mailto:${contact.email}`} className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                  <Mail size={15} />
                </a>
                {contact.whatsapp && (
                  <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                    <Phone size={15} />
                  </a>
                )}
              </div>
            )}
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-black/32">
              {contact.source} / {formatDate(contact.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function InquiriesPanel({
  inquiries,
  onAction,
  onRefresh,
}: {
  inquiries: InquiryRecord[];
  onAction: (url: string, init?: RequestInit) => Promise<unknown>;
  onRefresh: () => Promise<void>;
}) {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { status: string; notes: string }>>({});
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  const filteredInquiries = useMemo(() => {
    const keyword = search.toLowerCase();
    return inquiries.filter((inquiry) =>
      [inquiry.name, inquiry.email, inquiry.whatsapp, inquiry.message, inquiry.source, inquiry.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword) &&
      (source === "Semua" || inquiry.source === source) &&
      (status === "Semua" || inquiry.status === status)
    );
  }, [inquiries, search, source, status]);

  const sourceOptions = uniqueOptions(inquiries, (inquiry) => inquiry.source);
  const statusOptions = uniqueOptions(inquiries, (inquiry) => inquiry.status);

  const getDraft = (inquiry: InquiryRecord) =>
    drafts[inquiry.id] || { status: inquiry.status || "Baru", notes: inquiry.notes || "" };

  const saveInquiry = async (inquiry: InquiryRecord) => {
    setSavingId(inquiry.id);
    setActionError("");
    try {
      await onAction("/api/admin/inquiries", {
        method: "PATCH",
        body: JSON.stringify({ id: inquiry.id, ...getDraft(inquiry) }),
      });
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal memperbarui inquiry.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <Panel title="Inquiry Masuk" action={`${filteredInquiries.length}/${inquiries.length} records`}>
      {actionError && <AdminNotice>{actionError}</AdminNotice>}
      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
        <AdminSearch value={search} onChange={setSearch} placeholder="Cari nama, email, pesan..." />
        <AdminSelect value={source} onChange={setSource} options={["Semua", ...sourceOptions]} />
        <AdminSelect value={status} onChange={setStatus} options={["Semua", ...statusOptions]} />
      </div>
      <div className="grid gap-3">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-[12px] border border-black/[0.05] bg-[#FCFCFB] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-base font-semibold">{inquiry.name}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-black/48">
                  <span className="flex items-center gap-1"><Mail size={13} /> {inquiry.email}</span>
                  {inquiry.whatsapp && <span className="flex items-center gap-1"><Phone size={13} /> {inquiry.whatsapp}</span>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{inquiry.source}</Badge>
                <Badge tone="gold">{getDraft(inquiry).status}</Badge>
              </div>
            </div>
            <p className="mt-4 text-sm font-light leading-relaxed text-black/58">{inquiry.message}</p>
            <div className="mt-5 grid gap-3 lg:grid-cols-[180px_1fr_auto]">
              <select
                value={getDraft(inquiry).status}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [inquiry.id]: { ...getDraft(inquiry), status: event.target.value },
                  }))
                }
                className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
              >
                <option>Baru</option>
                <option>Dibalas</option>
                <option>Perlu Follow Up</option>
                <option>Selesai</option>
                <option>Diarsipkan</option>
              </select>
              <input
                value={getDraft(inquiry).notes}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [inquiry.id]: { ...getDraft(inquiry), notes: event.target.value },
                  }))
                }
                placeholder="Catatan tindak lanjut inquiry..."
                className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
              />
              <div className="flex gap-2">
                <a href={`mailto:${inquiry.email}`} className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                  <Mail size={15} />
                </a>
                {inquiry.whatsapp && (
                  <a href={`https://wa.me/${inquiry.whatsapp.replace(/\D/g, "")}`} target="_blank" className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white text-[#0B2C6B]">
                    <Phone size={15} />
                  </a>
                )}
                <button
                  onClick={() => saveInquiry(inquiry)}
                  disabled={savingId === inquiry.id}
                  className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#0B2C6B] text-white disabled:opacity-50"
                >
                  <Save size={15} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-black/32">{formatDate(inquiry.createdAt)}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CoachPanel({
  mode,
  coaches,
  assignments = [],
  sessions = [],
  availability = [],
  documents = [],
  onAction,
  onRefresh,
}: {
  mode: "coach" | "hrm";
  coaches: CoachRecord[];
  assignments?: CoachAssignmentRecord[];
  sessions?: CoachSessionRecord[];
  availability?: CoachAvailabilityRecord[];
  documents?: CoachDocumentRecord[];
  onAction: (url: string, init?: RequestInit) => Promise<unknown>;
  onRefresh: () => Promise<void>;
}) {
  const emptyCoach = {
    name: "",
    email: "",
    phone: "",
    expertise: "",
    field: "",
    category: "Coach Eksternal",
    rate: "",
    availability: "",
    status: "active",
    bio: "",
    notes: "",
  };
  const [form, setForm] = useState(emptyCoach);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [opsError, setOpsError] = useState("");
  const [assignmentForm, setAssignmentForm] = useState({
    coach_id: "",
    client_name: "",
    program_name: "",
    service: "",
    status: "Planned",
    start_date: "",
    end_date: "",
    notes: "",
  });
  const [availabilityForm, setAvailabilityForm] = useState({
    coach_id: "",
    day_of_week: "Senin",
    time_window: "",
    mode: "Hybrid",
    status: "Available",
    notes: "",
  });
  const [sessionForm, setSessionForm] = useState({
    coach_id: "",
    assignment_id: "",
    session_date: "",
    duration_minutes: "90",
    topic: "",
    rating: "5",
    evaluation: "",
    notes: "",
  });
  const [documentForm, setDocumentForm] = useState({
    coach_id: "",
    title: "",
    document_type: "Kontrak",
    document_url: "",
    status: "Active",
    expiry_date: "",
    notes: "",
  });

  const filteredCoaches = useMemo(() => {
    const keyword = search.toLowerCase();
    return coaches.filter((coach) =>
      [
        coach.name,
        coach.email,
        coach.phone,
        coach.expertise,
        coach.field,
        coach.category,
        coach.status,
        coach.availability,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword) &&
      (fieldFilter === "Semua" || coach.field === fieldFilter) &&
      (categoryFilter === "Semua" || coach.category === categoryFilter) &&
      (statusFilter === "Semua" || coach.status === statusFilter)
    );
  }, [categoryFilter, coaches, fieldFilter, search, statusFilter]);

  const fieldOptions = uniqueOptions(coaches, (coach) => coach.field);
  const categoryOptions = uniqueOptions(coaches, (coach) => coach.category);
  const statusOptions = uniqueOptions(coaches, (coach) => coach.status);
  const coachOptions: Array<[string, string]> = coaches
    .filter((coach) => coach.id)
    .map((coach) => [coach.id || "", coach.name || "Coach BinaHub"]);
  const assignmentOptions: Array<[string, string]> = assignments
    .filter((assignment) => assignment.id)
    .map((assignment) => [
      assignment.id || "",
      `${assignment.program_name || "Program"} - ${assignment.client_name || "Klien"}`,
    ]);
  const coachName = (id?: string) => coaches.find((coach) => coach.id === id)?.name || "Coach";

  const submitCoachOp = async (
    resource: "assignments" | "availability" | "sessions" | "documents",
    payload: Record<string, string>
  ) => {
    setOpsError("");
    try {
      await onAction(`/api/admin/coach-ops?resource=${resource}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await onRefresh();
    } catch (error) {
      setOpsError(error instanceof Error ? error.message : "Gagal menyimpan data HRM.");
    }
  };

  const deleteCoachOp = async (
    resource: "assignments" | "availability" | "sessions" | "documents",
    id?: string
  ) => {
    if (!id || !window.confirm("Hapus data operasional HRM ini?")) return;
    setOpsError("");
    try {
      await onAction(`/api/admin/coach-ops?resource=${resource}&id=${id}`, { method: "DELETE" });
      await onRefresh();
    } catch (error) {
      setOpsError(error instanceof Error ? error.message : "Gagal menghapus data HRM.");
    }
  };

  const submitCoach = async () => {
    setSaving(true);
    setActionError("");
    try {
      await onAction("/api/admin/coaches", {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
      });
      setForm(emptyCoach);
      setEditingId(null);
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal menyimpan data coach.");
    } finally {
      setSaving(false);
    }
  };

  const editCoach = (coach: CoachRecord) => {
    setEditingId(coach.id || null);
    setForm({
      name: coach.name || "",
      email: coach.email || "",
      phone: coach.phone || "",
      expertise: coach.expertise || "",
      field: coach.field || "",
      category: coach.category || "Coach Eksternal",
      rate: coach.rate || "",
      availability: coach.availability || "",
      status: coach.status || "active",
      bio: coach.bio || "",
      notes: coach.notes || "",
    });
  };

  const deleteCoach = async (coach: CoachRecord) => {
    if (!coach.id || !window.confirm(`Hapus data coach ${coach.name || ""}?`)) return;
    setActionError("");
    try {
      await onAction(`/api/admin/coaches?id=${coach.id}`, { method: "DELETE" });
      await onRefresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal menghapus data coach.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[14px] border border-[#D9A441]/25 bg-[#FFF8EA] p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B6C17]">HRM Roadmap</p>
        <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-[#0B2C6B]">
          Modul coach sudah disiapkan sebagai fondasi HRM.
        </h3>
        <p className="mt-4 max-w-3xl text-sm font-light leading-relaxed text-black/58">
          Untuk tahap awal dashboard akan membaca tabel <code>coaches</code> jika tersedia.
          Berikutnya modul ini bisa diperluas menjadi penugasan coach per bidang, availability,
          pipeline engagement, catatan sesi, dan performa program.
        </p>
      </div>

      {mode === "coach" && (
      <Panel title={editingId ? "Edit Data Coach" : "Tambah Coach Manual"} action="Coach input">
        {actionError && <AdminNotice>{actionError}</AdminNotice>}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <AdminInput label="Nama" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <AdminInput label="Email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <AdminInput label="Telepon" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
          <AdminInput label="Bidang" value={form.field} onChange={(value) => setForm({ ...form, field: value })} />
          <AdminInput label="Keahlian" value={form.expertise} onChange={(value) => setForm({ ...form, expertise: value })} />
          <AdminInput label="Kategori" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
          <AdminInput label="Rate" value={form.rate} onChange={(value) => setForm({ ...form, rate: value })} />
          <AdminInput label="Availability" value={form.availability} onChange={(value) => setForm({ ...form, availability: value })} />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[180px_1fr]">
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
            className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
          >
            <option value="active">Active</option>
            <option value="prospect">Prospect</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          <input
            value={form.bio}
            onChange={(event) => setForm({ ...form, bio: event.target.value })}
            placeholder="Bio singkat coach..."
            className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
          />
        </div>
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          placeholder="Catatan internal HRM, preferensi penugasan, histori kerja sama..."
          className="mt-3 min-h-24 w-full rounded-[10px] border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-[#D9A441]"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={submitCoach}
            disabled={saving || !form.name}
            className="flex h-11 items-center gap-2 rounded-[10px] bg-[#0B2C6B] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50"
          >
            {editingId ? <Save size={15} /> : <Plus size={15} />} {editingId ? "Simpan Coach" : "Tambah Coach"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm(emptyCoach);
              }}
              className="h-11 rounded-[10px] border border-black/10 bg-white px-4 text-xs font-bold uppercase tracking-[0.14em]"
            >
              Batal Edit
            </button>
          )}
        </div>
      </Panel>
      )}

      {mode === "hrm" && (
      <>
      <Panel title="Operasional Coach" action="Assignment, availability, session, contract">
        {opsError && <AdminNotice>{opsError}</AdminNotice>}
        <div className="grid gap-4 xl:grid-cols-2">
          <CollapsibleModule title="Assignment ke Program">
            <div className="grid gap-3 md:grid-cols-2">
              <AdminSelect value={assignmentForm.coach_id} onChange={(value) => setAssignmentForm({ ...assignmentForm, coach_id: value })} options={[["", "Pilih coach"], ...coachOptions]} />
              <AdminInput label="Klien" value={assignmentForm.client_name} onChange={(value) => setAssignmentForm({ ...assignmentForm, client_name: value })} />
              <AdminInput label="Program" value={assignmentForm.program_name} onChange={(value) => setAssignmentForm({ ...assignmentForm, program_name: value })} />
              <AdminInput label="Layanan" value={assignmentForm.service} onChange={(value) => setAssignmentForm({ ...assignmentForm, service: value })} />
              <AdminInput label="Mulai" value={assignmentForm.start_date} onChange={(value) => setAssignmentForm({ ...assignmentForm, start_date: value })} />
              <AdminInput label="Selesai" value={assignmentForm.end_date} onChange={(value) => setAssignmentForm({ ...assignmentForm, end_date: value })} />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-[160px_1fr]">
              <AdminSelect value={assignmentForm.status} onChange={(value) => setAssignmentForm({ ...assignmentForm, status: value })} options={["Planned", "Active", "Completed", "Paused", "Cancelled"]} />
              <input value={assignmentForm.notes} onChange={(event) => setAssignmentForm({ ...assignmentForm, notes: event.target.value })} placeholder="Catatan assignment..." className="h-12 rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]" />
            </div>
            <button onClick={() => submitCoachOp("assignments", assignmentForm)} disabled={!assignmentForm.coach_id || !assignmentForm.client_name} className="mt-3 h-11 rounded-[10px] bg-[#0B2C6B] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50">
              Simpan Assignment
            </button>
          </CollapsibleModule>

          <CollapsibleModule title="Availability Coach">
            <div className="grid gap-3 md:grid-cols-2">
              <AdminSelect value={availabilityForm.coach_id} onChange={(value) => setAvailabilityForm({ ...availabilityForm, coach_id: value })} options={[["", "Pilih coach"], ...coachOptions]} />
              <AdminSelect value={availabilityForm.day_of_week} onChange={(value) => setAvailabilityForm({ ...availabilityForm, day_of_week: value })} options={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]} />
              <AdminInput label="Jam" value={availabilityForm.time_window} onChange={(value) => setAvailabilityForm({ ...availabilityForm, time_window: value })} />
              <AdminSelect value={availabilityForm.mode} onChange={(value) => setAvailabilityForm({ ...availabilityForm, mode: value })} options={["Online", "Offline", "Hybrid"]} />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-[160px_1fr]">
              <AdminSelect value={availabilityForm.status} onChange={(value) => setAvailabilityForm({ ...availabilityForm, status: value })} options={["Available", "Limited", "Unavailable"]} />
              <input value={availabilityForm.notes} onChange={(event) => setAvailabilityForm({ ...availabilityForm, notes: event.target.value })} placeholder="Catatan availability..." className="h-12 rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]" />
            </div>
            <button onClick={() => submitCoachOp("availability", availabilityForm)} disabled={!availabilityForm.coach_id || !availabilityForm.time_window} className="mt-3 h-11 rounded-[10px] bg-[#0B2C6B] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50">
              Simpan Availability
            </button>
          </CollapsibleModule>

          <CollapsibleModule title="Histori Sesi & Evaluasi">
            <div className="grid gap-3 md:grid-cols-2">
              <AdminSelect value={sessionForm.coach_id} onChange={(value) => setSessionForm({ ...sessionForm, coach_id: value })} options={[["", "Pilih coach"], ...coachOptions]} />
              <AdminSelect value={sessionForm.assignment_id} onChange={(value) => setSessionForm({ ...sessionForm, assignment_id: value })} options={[["", "Tanpa assignment"], ...assignmentOptions]} />
              <AdminInput label="Tanggal sesi" value={sessionForm.session_date} onChange={(value) => setSessionForm({ ...sessionForm, session_date: value })} />
              <AdminInput label="Durasi menit" value={sessionForm.duration_minutes} onChange={(value) => setSessionForm({ ...sessionForm, duration_minutes: value })} />
              <AdminInput label="Topik" value={sessionForm.topic} onChange={(value) => setSessionForm({ ...sessionForm, topic: value })} />
              <AdminSelect value={sessionForm.rating} onChange={(value) => setSessionForm({ ...sessionForm, rating: value })} options={["1", "2", "3", "4", "5"]} />
            </div>
            <input value={sessionForm.evaluation} onChange={(event) => setSessionForm({ ...sessionForm, evaluation: event.target.value })} placeholder="Ringkasan evaluasi sesi..." className="mt-3 h-12 w-full rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]" />
            <button onClick={() => submitCoachOp("sessions", sessionForm)} disabled={!sessionForm.coach_id || !sessionForm.session_date} className="mt-3 h-11 rounded-[10px] bg-[#0B2C6B] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50">
              Simpan Sesi
            </button>
          </CollapsibleModule>

          <CollapsibleModule title="Dokumen & Kontrak">
            <div className="grid gap-3 md:grid-cols-2">
              <AdminSelect value={documentForm.coach_id} onChange={(value) => setDocumentForm({ ...documentForm, coach_id: value })} options={[["", "Pilih coach"], ...coachOptions]} />
              <AdminSelect value={documentForm.document_type} onChange={(value) => setDocumentForm({ ...documentForm, document_type: value })} options={["Kontrak", "NDA", "CV", "Sertifikat", "Invoice", "Lainnya"]} />
              <AdminInput label="Judul" value={documentForm.title} onChange={(value) => setDocumentForm({ ...documentForm, title: value })} />
              <AdminInput label="Link dokumen" value={documentForm.document_url} onChange={(value) => setDocumentForm({ ...documentForm, document_url: value })} />
              <AdminInput label="Masa berlaku" value={documentForm.expiry_date} onChange={(value) => setDocumentForm({ ...documentForm, expiry_date: value })} />
              <AdminSelect value={documentForm.status} onChange={(value) => setDocumentForm({ ...documentForm, status: value })} options={["Active", "Review", "Expired", "Archived"]} />
            </div>
            <input value={documentForm.notes} onChange={(event) => setDocumentForm({ ...documentForm, notes: event.target.value })} placeholder="Catatan dokumen..." className="mt-3 h-12 w-full rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]" />
            <button onClick={() => submitCoachOp("documents", documentForm)} disabled={!documentForm.coach_id || !documentForm.title} className="mt-3 h-11 rounded-[10px] bg-[#0B2C6B] px-4 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-50">
              Simpan Dokumen
            </button>
          </CollapsibleModule>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Assignment Aktif" action={`${assignments.length} records`}>
          <HrmList
            items={assignments}
            empty="Belum ada assignment."
            render={(item) => (
              <HrmItem
                title={`${item.program_name || "Program"} - ${item.client_name || "Klien"}`}
                meta={`${coachName(item.coach_id)} / ${item.service || "Layanan"} / ${item.status || "Planned"}`}
                detail={item.notes}
                onDelete={() => deleteCoachOp("assignments", item.id)}
              />
            )}
          />
        </Panel>

        <Panel title="Availability" action={`${availability.length} records`}>
          <HrmList
            items={availability}
            empty="Belum ada availability."
            render={(item) => (
              <HrmItem
                title={`${coachName(item.coach_id)} - ${item.day_of_week || "Hari"}`}
                meta={`${item.time_window || "-"} / ${item.mode || "Mode"} / ${item.status || "Available"}`}
                detail={item.notes}
                onDelete={() => deleteCoachOp("availability", item.id)}
              />
            )}
          />
        </Panel>

        <Panel title="Histori Sesi" action={`${sessions.length} records`}>
          <HrmList
            items={sessions}
            empty="Belum ada histori sesi."
            render={(item) => (
              <HrmItem
                title={`${coachName(item.coach_id)} - ${item.topic || "Sesi"}`}
                meta={`${item.session_date || "-"} / ${item.duration_minutes || 0} menit / Rating ${item.rating || "-"}`}
                detail={item.evaluation || item.notes}
                onDelete={() => deleteCoachOp("sessions", item.id)}
              />
            )}
          />
        </Panel>

        <Panel title="Dokumen Coach" action={`${documents.length} records`}>
          <HrmList
            items={documents}
            empty="Belum ada dokumen."
            render={(item) => (
              <HrmItem
                title={item.title || "Dokumen"}
                meta={`${coachName(item.coach_id)} / ${item.document_type || "Dokumen"} / ${item.status || "Active"}`}
                detail={item.document_url || item.notes}
                onDelete={() => deleteCoachOp("documents", item.id)}
              />
            )}
          />
        </Panel>
      </div>
      </>
      )}

      {mode === "coach" && (
      <Panel title="Daftar Coach" action={`${filteredCoaches.length}/${coaches.length} records`}>
        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_160px]">
          <AdminSearch value={search} onChange={setSearch} placeholder="Cari nama, email, bidang, keahlian..." />
          <AdminSelect value={fieldFilter} onChange={setFieldFilter} options={["Semua", ...fieldOptions]} />
          <AdminSelect value={categoryFilter} onChange={setCategoryFilter} options={["Semua", ...categoryOptions]} />
          <AdminSelect value={statusFilter} onChange={setStatusFilter} options={["Semua", ...statusOptions]} />
        </div>
        {filteredCoaches.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCoaches.map((coach, index) => (
              <div key={coach.id || index} className="rounded-[12px] border border-black/[0.05] bg-[#FCFCFB] p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#0B2C6B] text-[#D9A441]">
                  <BriefcaseBusiness size={19} />
                </div>
                <p className="text-base font-semibold">{coach.name || "Coach BinaHub"}</p>
                <p className="mt-1 text-sm text-black/48">{coach.expertise || coach.field || "Bidang belum diisi"}</p>
                <p className="mt-4 text-xs leading-relaxed text-black/48">{coach.bio || "Profil coach akan tampil di sini setelah data HRM diisi."}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge>{coach.category || "Coach"}</Badge>
                  <Badge tone="gold">{coach.status || "active"}</Badge>
                  {coach.availability && <Badge>{coach.availability}</Badge>}
                </div>
                <div className="mt-5 flex gap-2">
                  <button onClick={() => editCoach(coach)} className="h-10 flex-1 rounded-[10px] border border-black/10 bg-white text-xs font-bold uppercase tracking-[0.12em]">
                    Edit
                  </button>
                  {coach.email && (
                    <a href={`mailto:${coach.email}`} className="grid h-10 w-10 place-items-center rounded-[10px] border border-black/10 bg-white">
                      <Mail size={14} />
                    </a>
                  )}
                  <button onClick={() => deleteCoach(coach)} className="grid h-10 w-10 place-items-center rounded-[10px] border border-red-100 bg-red-50 text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[12px] border border-dashed border-black/10 bg-[#FAFAF8] p-8 text-center">
            <ShieldCheck className="mx-auto mb-4 text-[#D9A441]" size={32} />
            <p className="text-sm font-semibold text-[#0B2C6B]">Belum ada data coach.</p>
            <p className="mx-auto mt-2 max-w-xl text-sm font-light leading-relaxed text-black/48">
              Buat tabel <code>coaches</code> di Supabase untuk mulai mengisi daftar coach,
              bidang keahlian, status kerja sama, dan catatan HRM.
            </p>
          </div>
        )}
      </Panel>
      )}
    </div>
  );
}

function AdminSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[12px] border border-black/10 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#D9A441]"
      />
    </div>
  );
}

function HrmList<T>({
  items,
  empty,
  render,
}: {
  items: T[];
  empty: string;
  render: (item: T) => React.ReactNode;
}) {
  if (!items.length) {
    return <p className="rounded-[10px] bg-[#FAFAF8] p-4 text-sm text-black/48">{empty}</p>;
  }

  return <div className="space-y-3">{items.slice(0, 8).map((item, index) => <div key={index}>{render(item)}</div>)}</div>;
}

function CollapsibleModule({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[12px] border border-black/[0.05] bg-[#FCFCFB]">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold text-[#0B2C6B]"
      >
        {title}
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-black/[0.05] p-4">{children}</div>}
    </div>
  );
}

function HrmItem({
  title,
  meta,
  detail,
  onDelete,
}: {
  title: string;
  meta: string;
  detail?: string | null;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[10px] border border-black/[0.05] bg-[#FCFCFB] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#0B2C6B]">{title}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black/34">{meta}</p>
        </div>
        <button onClick={onDelete} className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] border border-red-100 bg-red-50 text-red-600">
          <Trash2 size={13} />
        </button>
      </div>
      {detail && <p className="mt-3 text-xs leading-relaxed text-black/50">{detail}</p>}
    </div>
  );
}

function AdminSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<string | [string, string]>;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 rounded-[12px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
    >
      {options.map((option) => {
        const optionValue = Array.isArray(option) ? option[0] : option;
        const label = Array.isArray(option) ? option[1] : option;
        return (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

function AdminInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/36">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[10px] border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#D9A441]"
      />
    </label>
  );
}

function Badge({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "gold" }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
        tone === "gold"
          ? "bg-[#D9A441]/12 text-[#9B6C17]"
          : "bg-[#0B2C6B]/7 text-[#0B2C6B]/62"
      }`}
    >
      {children}
    </span>
  );
}

function NotificationBadge({ count }: { count: number }) {
  return (
    <span className="min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-white shadow-[0_8px_18px_-10px_rgba(220,38,38,0.9)]">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function AdminNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 rounded-[10px] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
      {children}
    </div>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[14px] border border-black/[0.05] bg-white p-5 shadow-[0_16px_50px_-44px_rgba(11,44,107,0.28)] md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#0B2C6B]">{title}</h3>
        {action && <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/34">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-[#0B2C6B]/76">{label}</span>
        <span className="font-semibold text-[#0B2C6B]">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#EDF1F6]">
        <div className="h-full rounded-full bg-[#0B2C6B]" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-40 animate-pulse rounded-[14px] bg-white" />
      ))}
    </div>
  );
}
