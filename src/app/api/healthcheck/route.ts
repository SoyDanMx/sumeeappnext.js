export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
}
