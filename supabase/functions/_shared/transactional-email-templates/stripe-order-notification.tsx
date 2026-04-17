import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'REPLIC8'

interface StripeOrderProps {
  customerName?: string
  customerEmail?: string
  products?: string
  total?: string
  currency?: string
  sessionId?: string
}

const StripeOrderNotificationEmail = ({
  customerName = 'Customer',
  customerEmail = '',
  products = 'Watch',
  total = '0',
  currency = 'EUR',
  sessionId = '',
}: StripeOrderProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New paid order from {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Stripe Order (Paid)</Heading>
        <Text style={text}>A new card payment has been completed on {SITE_NAME}.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Customer</Text>
          <Text style={value}>{customerName}</Text>
          {customerEmail && <Text style={value}>{customerEmail}</Text>}
        </Section>
        <Section>
          <Text style={label}>Products</Text>
          <Text style={value}>{products}</Text>
        </Section>
        <Section>
          <Text style={label}>Amount Paid</Text>
          <Text style={totalStyle}>{currency} {total}</Text>
        </Section>
        {sessionId && (
          <Section>
            <Text style={label}>Stripe Session</Text>
            <Text style={mono}>{sessionId}</Text>
          </Section>
        )}
        <Hr style={hr} />
        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: StripeOrderNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New Paid Order — ${data.currency || 'EUR'} ${data.total || '0'} from ${data.customerName || 'Customer'}`,
  displayName: 'Stripe order notification',
  to: 'kyriacos1999@gmail.com',
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    products: 'Meridian Diver',
    total: '300',
    currency: 'EUR',
    sessionId: 'cs_test_a1b2c3',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#555', lineHeight: '1.5', margin: '0 0 12px' }
const label = { fontSize: '11px', color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '16px 0 4px' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0 0 4px' }
const totalStyle = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0' }
const mono = { fontSize: '12px', color: '#555', fontFamily: 'monospace', margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '11px', color: '#aaa', margin: '24px 0 0' }
