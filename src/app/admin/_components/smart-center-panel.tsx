"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardList, Layers3 } from "lucide-react";
import {
  AdminInput,
  AdminNotice,
  AdminSelect,
  AdminTextarea,
  Badge,
  CollapsibleModule,
  ConfirmDialog,
  EmptyState,
  FieldLabel,
  FormSection,
  GuidancePanel,
  Panel,
  PresetButtons,
  StatCard,
  WorkflowStrip,
} from "./shared";
import {
  ADMIN_SERVICE_OPTIONS,
  ADMIN_WORKFLOW_STEPS,
  BUDGET_NOTE_OPTIONS,
  PROJECT_SCOPE_PRESETS,
  PROJECT_TYPE_OPTIONS,
} from "../_lib/constants";
import { formatDate, isProjectCompleted } from "../_lib/utils";
import type { ConfirmAction, DashboardData, ProjectRecord, SmartActionRecord } from "../_lib/types";

export function SmartCenterPanel({
  data,
  onAction,
  onRefresh,
}: {
  data: DashboardData;
  onAction: (url: string, init?: RequestInit) => Promise<unknown>;
  onRefresh: () => Promise<void>;
}) {
  const projects = data.projects || [];
  const projectAssignments = data.projectAssignments || [];
  const smartActions = data.smartActions || [];
  const completedProjects = projects.filter(isProjectCompleted);
  const activeProjects = projects.filter((project) => !isProjectCompleted(project));
  const pendingActions = smartActions.filter((action) => (action.status || "").toLowerCase() === "pending");
  const sentInvitations = projectAssignments.filter((assignment) => assignment.invitation_sent_at).length;
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [form, setForm] = useState({
    client_name: "",
    contact_name: "",
    contact_email: "",
    service: "",
    program_name: "",
    project_type: "Transformation",
    scope: "",
    budget_note: "",
    start_date: "",
    end_date: "",
    automation_mode: "autopilot",
    status: "Draft",
  });

  const setField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const confirmAndRun = (action: ConfirmAction) => setConfirmAction(action);
  const isProjectFormReady = Boolean(form.client_name.trim() && form.contact_email.trim() && form.service.trim());

  const createProject = async (mode: "save" | "draft" | "send") => {
    try {
      setNotice("");
      setBusy(mode);
      const response = (await onAction("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify(form),
      })) as { project?: ProjectRecord };

      if (mode !== "save" && response.project?.id) {
        await onAction("/api/admin/project-autopilot", {
          method: "POST",
          body: JSON.stringify({ projectId: response.project.id, sendInvitations: mode === "send" }),
        });
      }

      setForm({
        client_name: "",
        contact_name: "",
        contact_email: "",
        service: "",
        program_name: "",
        project_type: "Transformation",
        scope: "",
        budget_note: "",
        start_date: "",
        end_date: "",
        automation_mode: "autopilot",
        status: "Draft",
      });
      setNotice(
        mode === "save"
          ? "Project tersimpan dan masuk antrean smart action."
          : mode === "send"
            ? "Project dibuat, assignment digenerate, dan invitation dikirim otomatis."
            : "Project dibuat dan draft assignment AI sudah digenerate.",
      );
      await onRefresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Aksi Automation Center gagal.");
    } finally {
      setBusy("");
    }
  };

  const runProjectAutopilot = async (projectId?: string, sendInvitations = false) => {
    if (!projectId) return;
    try {
      setNotice("");
      setBusy(`${projectId}-${sendInvitations ? "send" : "draft"}`);
      await onAction("/api/admin/project-autopilot", {
        method: "POST",
        body: JSON.stringify({ projectId, sendInvitations }),
      });
      setNotice(sendInvitations ? "Invitation associate sudah dikirim." : "Draft assignment AI sudah diperbarui.");
      await onRefresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Autopilot project gagal dijalankan.");
    } finally {
      setBusy("");
    }
  };

  const updateSmartAction = async (action: SmartActionRecord, status: string) => {
    if (!action.id) return;
    try {
      setNotice("");
      setBusy(`${action.id}-${status}`);
      await onAction("/api/admin/smart-actions", {
        method: "PATCH",
        body: JSON.stringify({ id: action.id, status }),
      });
      await onRefresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Status smart action gagal diubah.");
    } finally {
      setBusy("");
    }
  };

  const executeSmartAction = async (action: SmartActionRecord) => {
    if (!action.target_id) return;
    const shouldSend = action.action_type === "send_associate_invitations";
    await runProjectAutopilot(action.target_id, shouldSend);
    await updateSmartAction(action, "Completed");
  };

  const updateProjectStatus = async (projectId: string | undefined, status: string) => {
    if (!projectId) return;
    try {
      setNotice("");
      setBusy(`${projectId}-${status}`);
      await onAction("/api/admin/projects", {
        method: "PATCH",
        body: JSON.stringify({ id: projectId, status }),
      });
      setNotice(status === "Completed" ? "Project masuk ke folder Project Selesai." : "Project dikembalikan ke pipeline aktif.");
      await onRefresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Status project gagal diubah.");
    } finally {
      setBusy("");
    }
  };

  const metrics = [
    { label: "Project", value: projects.length },
    { label: "Smart Action Pending", value: pendingActions.length },
    { label: "Assignment AI", value: projectAssignments.length },
    { label: "Invitation Terkirim", value: sentInvitations },
  ];

  return (
    <div className="space-y-6">
      {confirmAction && (
        <ConfirmDialog
          action={confirmAction}
          onClose={() => setConfirmAction(null)}
        />
      )}
      {notice && <AdminNotice>{notice}</AdminNotice>}

      <GuidancePanel
        title="Panduan Automation Center"
        items={[
          "Simpan Project hanya mencatat pipeline dan membuat smart action untuk direview.",
          "Generate Assignment membuat draft role dan rekomendasi associate tanpa mengirim email.",
          "Kirim Invitation selalu cek ringkasan project, email PIC, dan daftar associate terlebih dahulu.",
        ]}
      />

      <WorkflowStrip steps={[...ADMIN_WORKFLOW_STEPS]} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={
              metric.label === "Smart Action Pending"
                ? AlertCircle
                : metric.label === "Invitation Terkirim"
                  ? CheckCircle2
                  : metric.label === "Assignment AI"
                    ? Layers3
                    : ClipboardList
            }
            tone={metric.label === "Smart Action Pending" && metric.value > 0 ? "gold" : "default"}
          />
        ))}
      </div>

      <Panel title="Project Autopilot" action="AI plan, matching, invitation">
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <FormSection
            title="1. Identitas klien"
            description="Field ini menjadi sumber data utama untuk project pipeline dan email invitation."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="Nama Klien"
                value={form.client_name}
                onChange={(value) => setField("client_name", value)}
                placeholder="Contoh: PT Nusantara Energi"
                help="Wajib diisi. Nama ini dipakai pada project, assignment AI, dan ringkasan invitation."
              />
              <AdminInput
                label="Kontak Utama"
                value={form.contact_name}
                onChange={(value) => setField("contact_name", value)}
                placeholder="Contoh: Ibu Rani, HR Director"
                help="PIC utama klien. Isi nama dan jabatan jika tersedia agar follow-up lebih kontekstual."
              />
              <AdminInput
                label="Email Kontak"
                value={form.contact_email}
                onChange={(value) => setField("contact_email", value)}
                placeholder="nama@perusahaan.com"
                type="email"
                help="Wajib diisi. Sistem memakai email ini untuk konteks project dan validasi sebelum autopilot."
              />
              <label className="block">
                <FieldLabel label="Layanan" help="Wajib diisi. Layanan membantu AI menentukan role associate dan scope rekomendasi." />
                <AdminSelect
                  value={form.service}
                  onChange={(value) => setField("service", value)}
                  options={[["", "Pilih layanan"], ...ADMIN_SERVICE_OPTIONS]}
                  ariaLabel="Pilih layanan project"
                />
              </label>
            </div>
          </FormSection>

          <FormSection
            title="2. Detail program"
            description="Lengkapi konteks agar draft role, jadwal, dan budget note tidak ambigu."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="Nama Program"
                value={form.program_name}
                onChange={(value) => setField("program_name", value)}
                placeholder="Contoh: Leadership Acceleration Q3"
                help="Nama program yang akan muncul di pipeline dan email invitation associate."
              />
              <label className="block">
                <FieldLabel label="Tipe Project" help="Pilih tipe paling dekat dengan delivery utama agar assignment lebih presisi." />
                <AdminSelect
                  value={form.project_type}
                  onChange={(value) => setField("project_type", value)}
                  options={PROJECT_TYPE_OPTIONS}
                  ariaLabel="Pilih tipe project"
                />
              </label>
              <AdminInput label="Mulai" value={form.start_date} onChange={(value) => setField("start_date", value)} type="date" help="Tanggal mulai bersifat opsional, tetapi membantu associate membaca kesiapan jadwal." />
              <AdminInput label="Selesai" value={form.end_date} onChange={(value) => setField("end_date", value)} type="date" help="Tanggal selesai membantu AI memperkirakan durasi dan intensitas assignment." />
              <label className="block md:col-span-2">
                <FieldLabel label="Budget Note" help="Catatan budget membantu admin memprioritaskan project dan ekspektasi delivery." />
                <AdminSelect value={form.budget_note} onChange={(value) => setField("budget_note", value)} options={BUDGET_NOTE_OPTIONS} ariaLabel="Pilih catatan budget" />
              </label>
            </div>
          </FormSection>
        </div>

        <div className="mt-4">
          <AdminTextarea
            label="3. Scope Project"
            value={form.scope}
            onChange={(value) => setField("scope", value)}
            placeholder="Contoh: Assessment kesiapan, workshop alignment, pendampingan eksekusi, dan pengukuran adoption."
            help="Tuliskan ruang lingkup kerja, output yang diharapkan, batasan, dan konteks klien. Semakin jelas scope, semakin baik matching AI."
            minHeight="min-h-32"
          />
          <PresetButtons options={PROJECT_SCOPE_PRESETS} onPick={(value) => setField("scope", value)} />
        </div>

        <div className="mt-5 rounded-[12px] border border-[#0B2C6B]/8 bg-[#F8FAFC] p-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-[#0B2C6B]">4. Pilih aksi</p>
            <p className="mt-1 text-xs leading-relaxed text-black/48">
              Simpan dulu untuk review manual, atau jalankan autopilot setelah field wajib terisi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
          <button
            onClick={() => createProject("save")}
            disabled={Boolean(busy) || !isProjectFormReady}
            title="Menyimpan project dan membuat smart action untuk direview manual."
            className="rounded-full border border-[#0B2C6B]/18 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0B2C6B] disabled:opacity-45"
          >
            Simpan Project
          </button>
          <button
            onClick={() =>
              confirmAndRun({
                title: "Generate assignment AI?",
                description: "Sistem akan membuat draft role dan matching associate untuk project ini. Belum ada email yang dikirim.",
                confirmLabel: "Generate Assignment",
                details: [form.client_name || "Klien belum diisi", form.program_name || "Program belum diisi"],
                onConfirm: () => createProject("draft"),
              })
            }
            disabled={Boolean(busy) || !isProjectFormReady}
            title="Membuat draft role dan matching associate tanpa mengirim email."
            className="rounded-full bg-[#0B2C6B] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white disabled:opacity-45"
          >
            Generate Assignment
          </button>
          <button
            onClick={() =>
              confirmAndRun({
                title: "Kirim invitation ke associate?",
                description: "Sistem akan membuat project, generate assignment, lalu mengirim email invitation ke associate yang dipilih AI.",
                confirmLabel: "Kirim Invitation",
                tone: "gold",
                details: [
                  `Klien: ${form.client_name || "belum diisi"}`,
                  `Program: ${form.program_name || "belum diisi"}`,
                  `Kontak: ${form.contact_email || "email kontak belum diisi"}`,
                ],
                onConfirm: () => createProject("send"),
              })
            }
            disabled={Boolean(busy) || !isProjectFormReady}
            title="Generate assignment lalu mengirim invitation setelah dialog konfirmasi."
            className="rounded-full bg-[#D9A441] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#071B3D] disabled:opacity-45"
          >
            Review & Kirim Invitation
          </button>
          </div>
        {!isProjectFormReady && (
          <p className="mt-3 text-xs leading-relaxed text-black/45">
            Isi minimal nama klien, email kontak, dan layanan sebelum menyimpan atau menjalankan autopilot.
          </p>
        )}
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Smart Actions" action={`${pendingActions.length} pending`}>
          <div className="space-y-3">
            {smartActions.slice(0, 8).map((action) => (
              <div key={action.id || action.title} className="rounded-[12px] border border-black/[0.06] bg-[#F8FAFC] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge tone={action.status === "Pending" ? "gold" : "navy"}>{action.status || "Pending"}</Badge>
                      <Badge>{action.priority || "Normal"}</Badge>
                      <Badge>{action.mode || "manual"}</Badge>
                    </div>
                    <p className="font-semibold text-[#0B2C6B]">{action.title || action.action_type}</p>
                    {action.description && <p className="mt-1 text-sm leading-relaxed text-[#0B2C6B]/62">{action.description}</p>}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {action.target_type === "project" && (
                      <button
                        onClick={() =>
                          confirmAndRun({
                            title: "Jalankan smart action ini?",
                            description: action.action_type === "send_associate_invitations"
                              ? "Aksi ini dapat mengirim invitation ke associate. Pastikan project dan draft assignment sudah sesuai."
                              : "Aksi ini akan menjalankan rekomendasi automation untuk target terkait.",
                            confirmLabel: "Jalankan",
                            tone: action.action_type === "send_associate_invitations" ? "gold" : "navy",
                            details: [action.title || action.action_type || "Smart action", action.description || ""].filter(Boolean),
                            onConfirm: () => executeSmartAction(action),
                          })
                        }
                        disabled={Boolean(busy)}
                        className="rounded-full bg-[#0B2C6B] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white disabled:opacity-45"
                      >
                        Jalankan
                      </button>
                    )}
                    <button
                      onClick={() => updateSmartAction(action, "Completed")}
                      disabled={Boolean(busy)}
                      className="rounded-full border border-[#0B2C6B]/14 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B2C6B] disabled:opacity-45"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {smartActions.length === 0 && (
              <EmptyState
                title="Belum ada smart action."
                description="Buat project baru dari form Project Autopilot agar sistem menyiapkan antrean review otomatis."
              />
            )}
          </div>
        </Panel>

        <Panel title="Project Pipeline" action={`${activeProjects.length} aktif / ${completedProjects.length} selesai`}>
          <div className="space-y-3">
            {activeProjects.slice(0, 8).map((project) => (
              <div key={project.id || project.client_name} className="rounded-[12px] border border-black/[0.06] bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge tone="gold">{project.status || "Draft"}</Badge>
                      <Badge>{project.automation_mode || "manual"}</Badge>
                    </div>
                    <p className="font-semibold text-[#0B2C6B]">{project.program_name || project.service || "Project baru"}</p>
                    <p className="mt-1 text-sm text-[#0B2C6B]/60">{project.client_name || "Tanpa nama klien"} {project.contact_email ? `- ${project.contact_email}` : ""}</p>
                    {project.ai_summary && <p className="mt-2 text-sm leading-relaxed text-[#0B2C6B]/62">{project.ai_summary}</p>}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() =>
                        confirmAndRun({
                          title: "Perbarui draft assignment AI?",
                          description: "Draft role dan matching associate lama untuk status Draft akan diganti dengan hasil terbaru.",
                          confirmLabel: "Draft AI",
                          details: [project.program_name || "Project baru", project.client_name || "Tanpa nama klien"],
                          onConfirm: () => runProjectAutopilot(project.id, false),
                        })
                      }
                      disabled={Boolean(busy)}
                      className="rounded-full border border-[#0B2C6B]/14 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B2C6B] disabled:opacity-45"
                    >
                      Draft AI
                    </button>
                    <button
                      onClick={() =>
                        confirmAndRun({
                          title: "Kirim invitation untuk project ini?",
                          description: "Sistem akan generate assignment terbaru dan mengirim email ke associate yang cocok.",
                          confirmLabel: "Kirim Invitation",
                          tone: "gold",
                          details: [project.program_name || "Project baru", project.contact_email || "Email kontak belum tersedia"],
                          onConfirm: () => runProjectAutopilot(project.id, true),
                        })
                      }
                      disabled={Boolean(busy)}
                      className="rounded-full bg-[#D9A441] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#071B3D] disabled:opacity-45"
                    >
                      Kirim
                    </button>
                    <button
                      onClick={() => updateProjectStatus(project.id, "Completed")}
                      disabled={Boolean(busy)}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 disabled:opacity-45"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {activeProjects.length === 0 && (
              <EmptyState
                title="Belum ada project aktif."
                description="Project yang disimpan atau digenerate dari autopilot akan tampil di sini sampai statusnya selesai."
              />
            )}
            {completedProjects.length > 0 && (
              <CollapsibleModule title={`Project selesai (${completedProjects.length})`}>
                <div className="space-y-3">
                  {completedProjects.slice(0, 12).map((project) => (
                    <div key={project.id || project.client_name} className="rounded-[12px] border border-dashed border-emerald-200 bg-emerald-50/55 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            <Badge tone="gold">{project.status || "Completed"}</Badge>
                            <Badge>{project.automation_mode || "manual"}</Badge>
                          </div>
                          <p className="font-semibold text-[#0B2C6B]">{project.program_name || project.service || "Project selesai"}</p>
                          <p className="mt-1 text-sm text-[#0B2C6B]/56">{project.client_name || "Tanpa nama klien"} {project.contact_email ? `- ${project.contact_email}` : ""}</p>
                          {project.ai_summary && <p className="mt-2 text-sm leading-relaxed text-[#0B2C6B]/54">{project.ai_summary}</p>}
                        </div>
                        <button
                          onClick={() => updateProjectStatus(project.id, "Autopilot Drafted")}
                          disabled={Boolean(busy)}
                          className="rounded-full border border-[#0B2C6B]/14 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B2C6B] disabled:opacity-45"
                        >
                          Aktifkan Lagi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleModule>
            )}
          </div>
        </Panel>
      </div>

      <Panel title="Assignment Autopilot" action={`${projectAssignments.length} draft/active`}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {projectAssignments.slice(0, 12).map((assignment) => (
            <div key={assignment.id || `${assignment.project_id}-${assignment.role_title}`} className="rounded-[12px] border border-black/[0.06] bg-[#F8FAFC] p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge tone={assignment.invitation_sent_at ? "gold" : "navy"}>{assignment.status || "Draft"}</Badge>
                {typeof assignment.match_score === "number" && <Badge>{assignment.match_score}% match</Badge>}
              </div>
              <p className="font-semibold text-[#0B2C6B]">{assignment.role_title || "Role project"}</p>
              <p className="mt-1 text-sm text-[#0B2C6B]/62">{assignment.associate_name || "Belum dipilih"} {assignment.associate_email ? `- ${assignment.associate_email}` : ""}</p>
              {assignment.match_reason && <p className="mt-3 text-sm leading-relaxed text-[#0B2C6B]/58">{assignment.match_reason}</p>}
              {assignment.invitation_sent_at && <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9B6C17]">Sent {formatDate(assignment.invitation_sent_at)}</p>}
            </div>
          ))}
          {projectAssignments.length === 0 && (
            <EmptyState
              title="Assignment AI belum tersedia."
              description="Jalankan Generate Assignment atau smart action project untuk membuat draft role, matching score, dan alasan rekomendasi."
            />
          )}
        </div>
      </Panel>
    </div>
  );
}
