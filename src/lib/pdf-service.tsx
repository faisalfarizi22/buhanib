import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Polygon, Line, Rect, Circle, Image } from '@react-pdf/renderer';
import { AssessmentData, DIMENSIONS } from './validations';

// Register Fonts (Inter)
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 300 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf', fontWeight: 700 },
  ],
});

export interface AssessmentResult {
  scores: Record<string, number> & { overall: number };
  category: string;
  aiAnalysis: string;
  recommendations: {
    title: string;
    description: string;
    priority: string;
    service: string;
  }[];
}

const NAVY = '#0A1A3A';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F4E5B2';
const ICE = '#F4F7FB';
const SILVER = '#8A9BB0';

const styles = StyleSheet.create({
  page: { backgroundColor: ICE, color: '#1A2332', fontFamily: 'Inter', padding: 0 },

  // Header Section (Full-bleed  style)
  header: { position: 'relative', backgroundColor: '#FFFFFF', height: 185, padding: '30 44', color: '#1A2332' },
  headerAccent: { position: 'absolute', bottom: -6, left: 0, right: 0, height: 6, backgroundColor: GOLD },
  headerMotif: { position: 'absolute', top: -30, right: -40, opacity: 0.1 },

  logoBox: { width: 100, height: 28, marginBottom: 15 },
  logoImage: { width: '100%', height: '100%', objectFit: 'contain' },


  headerTitleBlock: { marginTop: 8 },
  headerLabel: { color: GOLD, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
  headerTitle: { fontSize: 22, fontWeight: 700, lineHeight: 1 },
  headerSubtitle: { fontSize: 22, fontWeight: 700, color: NAVY, marginTop: 8 },

  metaRow: { flexDirection: 'row', marginTop: 25, gap: 40 },
  metaItem: { flexDirection: 'column' },
  metaLabel: { fontSize: 6.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  metaValue: { fontSize: 8, color: NAVY, fontWeight: 600 },

  // KPI Row
  kpiRow: { flexDirection: 'row', padding: '0 44', marginTop: 10, gap: 12, zIndex: 10 },
  kpiCard: { flex: 1, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, borderTopWidth: 4, borderTopColor: GOLD, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 } },
  kpiLabel: { fontSize: 7, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 },
  kpiValue: { fontSize: 18, fontWeight: 700, color: NAVY },
  kpiBadge: { marginTop: 8, padding: '3 8', backgroundColor: '#F1F5F9', borderRadius: 4, alignSelf: 'flex-start' },
  kpiBadgeText: { fontSize: 8, color: NAVY, fontWeight: 700 },

  content: { padding: '20 44 20 44' },

  // Section Header
  sectionHeader: { marginBottom: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  sectionBar: { width: 4, height: 30, backgroundColor: NAVY },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: '#1A2332' },
  sectionSubtitle: { fontSize: 8, color: '#64748B', marginTop: 2 },

  // Visuals Grid
  visualGrid: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  visualBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  visualTitle: { fontSize: 8, fontWeight: 700, color: NAVY, textTransform: 'uppercase', marginBottom: 15, textAlign: 'center' },

  // Bar Chart Row
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '100%' },
  barLabel: { width: 60, fontSize: 8, color: '#4A5568', fontWeight: 600 },
  barTrack: { flex: 1, height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden', marginHorizontal: 8 },
  barFill: { height: '100%', backgroundColor: NAVY, borderRadius: 3 },
  barValue: { width: 25, fontSize: 8, color: NAVY, fontWeight: 700, textAlign: 'right' },

  // Summary Box (Executive Style)
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 25, borderLeftWidth: 4, borderLeftColor: GOLD, marginBottom: 30 },
  summaryTitle: { fontSize: 10, fontWeight: 700, color: NAVY, textTransform: 'uppercase', marginBottom: 10 },
  summaryText: { fontSize: 10, lineHeight: 1.6, color: '#4A5568', fontWeight: 400 },

  // Page 2 Recommendation Grid
  recGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  recCard: { width: '31.5%', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, borderTopWidth: 3, borderTopColor: GOLD },
  recIcon: { width: 14, height: 14, backgroundColor: NAVY, borderRadius: 7, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  recIconInner: { width: 6, height: 6, backgroundColor: GOLD, borderRadius: 3 },
  recTitle: { fontSize: 9, fontWeight: 700, color: NAVY, marginBottom: 8, lineHeight: 1.3 },
  recDesc: { fontSize: 8.5, color: '#64748B', lineHeight: 1.5 },

  // Footer
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 44, backgroundColor: NAVY, borderTopWidth: 2, borderTopColor: GOLD, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0 44' },
  footerText: { fontSize: 7.5, color: SILVER },
  footerPage: { fontSize: 8, color: '#FFFFFF', fontWeight: 600 },
});

const AssessmentPDF = ({ formData, result, logoPath }: { formData: AssessmentData; result: AssessmentResult; logoPath?: string }) => {
  const scores = result.scores;
  const angleStep = (2 * Math.PI) / 7;
  const radarPoints = DIMENSIONS.map((dim, i) => {
    const score = scores[dim] || 0;
    const r = 45 * (score / 100);
    const angle = i * angleStep - Math.PI / 2;
    return { x: 65 + r * Math.cos(angle), y: 65 + r * Math.sin(angle) };
  }).map(p => `${p.x},${p.y}`).join(' ');

  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const logoSrc = logoPath || "https://buhanib.vercel.app/full-logo.png"; // Using local or URL fallback


  return (
    <Document title={`Laporan Diagnostik - ${formData.company}`}>
      <Page size="A4" style={styles.page}>

        {/* HEADER SECTION */}
        <View style={styles.header}>
          <Svg style={styles.headerMotif} width="200" height="200">
            <Circle cx="150" cy="50" r="100" fill={NAVY} fillOpacity="0.03" />
            <Circle cx="170" cy="70" r="70" fill={NAVY} fillOpacity="0.03" />
          </Svg>

          <View style={styles.logoBox}>
            <Image src={logoSrc} style={styles.logoImage} />
          </View>

          <View style={styles.headerTitleBlock}>
            <Text style={styles.headerLabel}>Assessment Performance Report</Text>
            <Text style={styles.headerTitle}>Human Synergy &</Text>
            <Text style={styles.headerSubtitle}>Strategic Maturity Diagnostic</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}><Text style={styles.metaLabel}>TAHUN FISKAL</Text><Text style={styles.metaValue}>2024 – 2025</Text></View>
            <View style={styles.metaItem}><Text style={styles.metaLabel}>DISUSUN UNTUK</Text><Text style={styles.metaValue}>{formData.name.toUpperCase()}</Text></View>
            <View style={styles.metaItem}><Text style={styles.metaLabel}>PERUSAHAAN</Text><Text style={styles.metaValue}>{formData.company.toUpperCase()}</Text></View>
            <View style={styles.metaItem}><Text style={styles.metaLabel}>TANGGAL ISYU</Text><Text style={styles.metaValue}>{date.toUpperCase()}</Text></View>
          </View>

          <View style={styles.headerAccent} />
        </View>

        {/* KPI CARDS ROW */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Overall Index Score</Text>
            <Text style={styles.kpiValue}>{scores.overall}</Text>
            <View style={styles.kpiBadge}><Text style={styles.kpiBadgeText}>Stage: {result.category}</Text></View>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total Dimensi</Text>
            <Text style={styles.kpiValue}>07</Text>
            <View style={styles.kpiBadge}><Text style={styles.kpiBadgeText}>Core Criteria</Text></View>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Skala Tim</Text>
            <Text style={styles.kpiValue}>{formData.employees || '-'}</Text>
            <View style={styles.kpiBadge}><Text style={styles.kpiBadgeText}>Human Asset</Text></View>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Klasifikasi</Text>
            <Text style={[styles.kpiValue, { fontSize: 14, marginTop: 4 }]}>Confidential</Text>
            <View style={styles.kpiBadge}><Text style={styles.kpiBadgeText}>High Priority</Text></View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <View>
              <Text style={styles.sectionTitle}>Peta Kinerja & Analisis 7 Dimensi Organisasi</Text>
              <Text style={styles.sectionSubtitle}>Visualisasi distribusi skor dan perbandingan efisiensi operasional</Text>
            </View>
          </View>

          <View style={styles.visualGrid}>
            {/* RADAR CHART */}
            <View style={styles.visualBox}>
              <Text style={styles.visualTitle}>Distribusi Keseimbangan</Text>
              <Svg width="130" height="130" viewBox="0 0 130 130" style={{ alignSelf: 'center' }}>
                {[0.25, 0.5, 0.75, 1].map((scale, idx) => {
                  const pts = DIMENSIONS.map((_, i) => {
                    const r = 45 * scale;
                    const angle = i * angleStep - Math.PI / 2;
                    return `${65 + r * Math.cos(angle)},${65 + r * Math.sin(angle)}`;
                  }).join(' ');
                  return <Polygon key={idx} points={pts} fill="none" stroke="#E2E8F0" strokeWidth="0.5" />;
                })}
                <Polygon points={radarPoints} fill="rgba(212, 175, 55, 0.15)" stroke={GOLD} strokeWidth="2" />
              </Svg>
              <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
                {DIMENSIONS.slice(0, 4).map(d => <Text key={d} style={{ fontSize: 6, color: SILVER }}>{d.toUpperCase()}: {scores[d]}</Text>)}
              </View>
            </View>

            {/* BAR CHART */}
            <View style={[styles.visualBox, { flex: 1.4 }]}>
              <Text style={styles.visualTitle}>Performance Scoreboard</Text>
              {DIMENSIONS.map(dim => (
                <View key={dim} style={styles.barRow}>
                  <Text style={styles.barLabel}>{dim}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${scores[dim] || 0}%`, backgroundColor: (scores[dim] || 0) >= 80 ? GOLD : NAVY }]} />
                  </View>
                  <Text style={styles.barValue}>{scores[dim]}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* EXECUTIVE SUMMARY */}
          <View style={styles.summaryCard} wrap={false}>
            <Text style={styles.summaryTitle}>Ringkasan Eksekutif & Analisis Strategis</Text>
            <Text style={styles.summaryText}>{result.aiAnalysis}</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 BinaHub · Strategic Transformation Division · Confidential Transmission</Text>
          <Text style={styles.footerPage}>Halaman 1 dari 2</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { height: 70, padding: '15 44' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: NAVY, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 800 }}>B</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Diagnostic Strategic Overview</Text>
              <Text style={{ fontSize: 7, color: '#64748B' }}>Detailed Transformation Roadmap · FY 2024–2025</Text>
            </View>
          </View>
          <View style={styles.headerAccent} />
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <View>
              <Text style={styles.sectionTitle}>Rekomendasi Tindakan & Roadmap Strategis</Text>
              <Text style={styles.sectionSubtitle}>Prioritas perbaikan berdasarkan hasil diagnostik 7 dimensi BinaHub</Text>
            </View>
          </View>

          <View style={styles.recGrid}>
            {result.recommendations.map((rec, i) => (
              <View key={i} style={styles.recCard}>
                <View style={styles.recIcon}><View style={styles.recIconInner} /></View>
                <Text style={{ fontSize: 7, color: SILVER, fontWeight: 700, marginBottom: 4 }}>STRATEGY 0{i + 1}</Text>
                <Text style={styles.recTitle}>{rec.title}</Text>
                <Text style={styles.recDesc}>{rec.description}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Insights Callout (simulating the python example) */}
          <View style={{ marginTop: 40, backgroundColor: '#E2E8F0', padding: 20, borderRadius: 8, borderTopWidth: 4, borderTopColor: NAVY }}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: NAVY, marginBottom: 8 }}>KUNCI STRATEGIS DARI TIM KONSULTAN</Text>
            <Text style={{ fontSize: 9, color: '#4A5568', lineHeight: 1.6 }}>
              Berdasarkan data yang diserahkan, prioritas utama Anda dalam 90 hari ke depan adalah penguatan pada dimensi {DIMENSIONS.find(d => (scores[d] || 0) === Math.min(...DIMENSIONS.map(dx => scores[dx] || 100)))} untuk mencegah *bottleneck* operasional. Tim BinaHub siap mendampingi proses implementasi roadmap ini.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 BinaHub · Human Transformation Partner · www.binahub.id</Text>
          <Text style={styles.footerPage}>Halaman 2 dari 2</Text>
        </View>
      </Page>
    </Document>
  );
};

export async function generatePDFBuffer(formData: AssessmentData, result: AssessmentResult): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');

  let logoBase64 = "https://buhanib.vercel.app/full-logo.png"; // Fallback URL
  try {
    const fs = await import('fs');
    const path = await import('path');
    const logoPath = path.join(process.cwd(), 'public', 'full-logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
      console.log('[PDF Service] Successfully loaded local logo as base64');
    } else {
      const altLogoPath = path.join(process.cwd(), 'website-prod', 'public', 'full-logo.png');
      if (fs.existsSync(altLogoPath)) {
        const logoBuffer = fs.readFileSync(altLogoPath);
        logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
        console.log('[PDF Service] Successfully loaded local logo from alternative path as base64');
      } else {
        console.warn('[PDF Service] Local logo not found, using URL fallback');
      }
    }
  } catch (error: any) {
    console.error('[PDF Service] Failed to read logo file locally, using URL fallback:', error.message);
  }

  // @ts-ignore
  return await renderToBuffer(<AssessmentPDF formData={formData} result={result} logoPath={logoBase64} />);
}
