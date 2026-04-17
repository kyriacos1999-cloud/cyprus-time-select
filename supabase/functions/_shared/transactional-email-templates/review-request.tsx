import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'REPLIC8'
const TIKTOK_URL = 'https://www.tiktok.com/@replic8cy'

interface ReviewRequestProps {
  customerName?: string
  productName?: string
}

const ReviewRequestEmail = ({
  customerName = 'there',
  productName = 'your watch',
}: ReviewRequestProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>How are you enjoying {productName}?</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>{SITE_NAME}</Heading>
          <Text style={tagline}>Premium Timepieces · Cyprus</Text>
        </Section>

        <Section style={hero}>
          <Heading style={h1}>How is {productName} treating you, {customerName}?</Heading>
          <Text style={lead}>
            It's been a few days since your watch arrived. We hope you're loving it.
          </Text>
        </Section>

        <Hr style={hr} />

        <Section>
          <Text style={value}>
            If you have a moment, we'd love a quick wrist-shot or a comment on our
            latest TikTok. Real customer photos help other Cypriots discover us —
            and it genuinely makes our day.
          </Text>
        </Section>

        <Section style={ctaSection}>
          <Button href={TIKTOK_URL} style={button}>
            Leave a comment on TikTok
          </Button>
          <Text style={muted}>@replic8cy</Text>
        </Section>

        <Hr style={hr} />

        <Section>
          <Text style={muted}>
            Anything not perfect? Just reply to this email or message us on TikTok
            — we'll make it right. Every watch is covered by our 1-year warranty.
          </Text>
        </Section>

        <Text style={footer}>
          {SITE_NAME} · Cyprus
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ReviewRequestEmail,
  subject: (data: Record<string, any>) =>
    `How is ${data.productName || 'your watch'} treating you?`,
  displayName: 'Review request (3 days post-order)',
  previewData: {
    customerName: 'Andreas',
    productName: 'Meridian Diver',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const header = { textAlign: 'center' as const, padding: '8px 0 24px', borderBottom: '1px solid #1a1a1a' }
const brand = { fontSize: '28px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0', letterSpacing: '0.15em' }
const tagline = { fontSize: '10px', color: '#999', margin: '6px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif' }
const hero = { padding: '32px 0 8px', textAlign: 'center' as const }
const h1 = { fontSize: '22px', fontWeight: 'normal' as const, color: '#1a1a1a', margin: '0 0 12px', lineHeight: '1.3' }
const lead = { fontSize: '14px', color: '#555', lineHeight: '1.6', margin: '0', fontFamily: 'Arial, sans-serif' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0', lineHeight: '1.7', fontFamily: 'Arial, sans-serif' }
const muted = { fontSize: '13px', color: '#777', lineHeight: '1.6', margin: '8px 0 0', fontFamily: 'Arial, sans-serif', textAlign: 'center' as const }
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const ctaSection = { textAlign: 'center' as const, padding: '16px 0 8px' }
const button = { backgroundColor: '#1a1a1a', color: '#ffffff', padding: '14px 32px', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif', display: 'inline-block' }
const footer = { fontSize: '10px', color: '#aaa', margin: '32px 0 0', textAlign: 'center' as const, letterSpacing: '0.1em', fontFamily: 'Arial, sans-serif' }
