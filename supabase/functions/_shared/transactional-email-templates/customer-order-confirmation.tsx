import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'REPLIC8'
const SITE_URL = 'https://replic8.shop'

interface CustomerOrderProps {
  customerName?: string
  products?: string
  total?: string
  currency?: string
  paymentMethod?: 'cod' | 'stripe' | string
  address?: string
  city?: string
  postalCode?: string
  akisBranch?: string
  orderRef?: string
}

const CustomerOrderConfirmationEmail = ({
  customerName = 'there',
  products = 'Your watch',
  total = '0',
  currency = 'EUR',
  paymentMethod = 'stripe',
  address = '',
  city = '',
  postalCode = '',
  akisBranch = '',
  orderRef = '',
}: CustomerOrderProps) => {
  const isCOD = paymentMethod === 'cod'
  const currencySymbol = currency === 'EUR' ? '€' : `${currency} `
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Thank you for your order at {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Brand header */}
          <Section style={header}>
            <Heading style={brand}>{SITE_NAME}</Heading>
            <Text style={tagline}>Premium Timepieces · Cyprus</Text>
          </Section>

          <Section style={hero}>
            <Heading style={h1}>Thank you, {customerName}.</Heading>
            <Text style={lead}>
              Your order has been received and is being prepared with care.
              We will be in touch shortly with delivery details.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Order summary */}
          <Section>
            <Text style={sectionTitle}>Order Summary</Text>
            <Section style={row}>
              <Text style={label}>Item(s)</Text>
              <Text style={value}>{products}</Text>
            </Section>
            <Section style={row}>
              <Text style={label}>Total</Text>
              <Text style={totalStyle}>{currencySymbol}{total}</Text>
            </Section>
            <Section style={row}>
              <Text style={label}>Payment</Text>
              <Text style={value}>
                {isCOD ? 'Cash on Delivery' : 'Card payment (paid)'}
              </Text>
            </Section>
            {orderRef && (
              <Section style={row}>
                <Text style={label}>Reference</Text>
                <Text style={mono}>{orderRef}</Text>
              </Section>
            )}
          </Section>

          {/* Delivery */}
          {(address || city || akisBranch) && (
            <>
              <Hr style={hr} />
              <Section>
                <Text style={sectionTitle}>Delivery</Text>
                {(address || city || postalCode) && (
                  <Text style={value}>
                    {address}
                    {postalCode ? `, ${postalCode}` : ''}
                    {city ? `, ${city}` : ''}
                  </Text>
                )}
                {akisBranch && (
                  <Text style={muted}>
                    Akis Express Branch: <span style={strong}>{akisBranch}</span>
                  </Text>
                )}
                <Text style={muted}>
                  Free next-day delivery across Cyprus via Akis Express.
                </Text>
              </Section>
            </>
          )}

          {/* What's next */}
          <Hr style={hr} />
          <Section>
            <Text style={sectionTitle}>What happens next?</Text>
            <Text style={value}>
              {isCOD
                ? '1. We will contact you to confirm the order.\n2. Your watch ships next business day via Akis Express.\n3. Pay in cash on delivery at your selected branch.'
                : '1. Your payment is confirmed.\n2. Your watch ships next business day via Akis Express.\n3. You will be notified when it is ready for pickup.'}
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button href={SITE_URL} style={button}>
              Visit {SITE_NAME}
            </Button>
          </Section>

          <Hr style={hr} />

          {/* Support */}
          <Section>
            <Text style={muted}>
              Questions? Reach us on TikTok{' '}
              <span style={strong}>@replic8cy</span> — we typically respond within
              a few hours.
            </Text>
            <Text style={muted}>
              Every watch comes with a 1-year warranty.
            </Text>
          </Section>

          <Text style={footer}>
            {SITE_NAME} · Cyprus · This is an automated confirmation.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CustomerOrderConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Your ${SITE_NAME} order is confirmed${data.orderRef ? ` — ${String(data.orderRef).slice(0, 8)}` : ''}`,
  displayName: 'Customer order confirmation',
  previewData: {
    customerName: 'Andreas',
    products: 'Meridian Diver',
    total: '300',
    currency: 'EUR',
    paymentMethod: 'stripe',
    address: '12 Ledra Street',
    city: 'Nicosia',
    postalCode: '1011',
    akisBranch: 'Nicosia Central',
    orderRef: 'a1b2c3d4',
  },
} satisfies TemplateEntry

// ===== Styles =====
const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const header = { textAlign: 'center' as const, padding: '8px 0 24px', borderBottom: '1px solid #1a1a1a' }
const brand = { fontSize: '28px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0', letterSpacing: '0.15em' }
const tagline = { fontSize: '10px', color: '#999', margin: '6px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif' }
const hero = { padding: '32px 0 8px', textAlign: 'center' as const }
const h1 = { fontSize: '24px', fontWeight: 'normal' as const, color: '#1a1a1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#555', lineHeight: '1.6', margin: '0', fontFamily: 'Arial, sans-serif' }
const sectionTitle = { fontSize: '11px', color: '#1a1a1a', fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: '0.18em', margin: '0 0 14px', fontFamily: 'Arial, sans-serif' }
const row = { margin: '0 0 10px' }
const label = { fontSize: '11px', color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.12em', margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0', lineHeight: '1.6', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-line' as const }
const totalStyle = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0', fontFamily: 'Georgia, serif' }
const mono = { fontSize: '12px', color: '#555', fontFamily: 'monospace', margin: '0' }
const muted = { fontSize: '13px', color: '#777', lineHeight: '1.6', margin: '0 0 8px', fontFamily: 'Arial, sans-serif' }
const strong = { color: '#1a1a1a', fontWeight: 'bold' as const }
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const ctaSection = { textAlign: 'center' as const, padding: '24px 0 8px' }
const button = { backgroundColor: '#1a1a1a', color: '#ffffff', padding: '14px 32px', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif', display: 'inline-block' }
const footer = { fontSize: '10px', color: '#aaa', margin: '32px 0 0', textAlign: 'center' as const, letterSpacing: '0.1em', fontFamily: 'Arial, sans-serif' }
