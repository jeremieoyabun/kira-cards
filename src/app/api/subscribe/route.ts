import { NextResponse } from 'next/server'

const welcomeHtmlEn = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050507;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050507;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-size:24px;font-weight:800;letter-spacing:3px;color:#fff;">KIRA CARDS</span>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:48px 40px;">

          <!-- Gradient line -->
          <div style="height:3px;border-radius:2px;background:linear-gradient(90deg,#c850ff,#4d9fff,#50ddb6,#ffe150,#ff6b8a);margin-bottom:32px;"></div>

          <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#fff;">Welcome to Kira Cards! ✨</h1>
          <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;">
            You're now on the early access list. We're building a collector-grade TCG and sports cards experience in Thailand — and you'll be among the first to know when we launch.
          </p>

          <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#fff;">What to expect:</h2>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:6px 12px 6px 0;color:#c850ff;font-size:18px;">🎴</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">Sealed & Verified Products</strong> — Pokemon, One Piece TCG & Topps sports cards with transparent sourcing</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#4d9fff;font-size:18px;">⚡</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">Fast Delivery</strong> — Nationwide shipping across Thailand</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#50ddb6;font-size:18px;">🏪</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">Online & In-Store</strong> — Shop online or visit us in Phuket</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#ffe150;font-size:18px;">🎁</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">Early Access Perks</strong> — Exclusive offers reserved for you at launch</td>
            </tr>
          </table>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:32px 0 8px;">
            <tr><td style="border-radius:100px;background:linear-gradient(135deg,#7c5cff,#5535ff);padding:14px 36px;">
              <a href="https://www.kira-cards.com" style="color:#fff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.5px;">Visit Kira Cards</a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:32px;">
          <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.2);">Kira Cards Co., Ltd. — TCG & Sports Cards Retailer in Thailand</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">Phuket, Thailand 🇹🇭</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

const welcomeHtmlTh = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050507;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050507;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-size:24px;font-weight:800;letter-spacing:3px;color:#fff;">KIRA CARDS</span>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:48px 40px;">

          <!-- Gradient line -->
          <div style="height:3px;border-radius:2px;background:linear-gradient(90deg,#c850ff,#4d9fff,#50ddb6,#ffe150,#ff6b8a);margin-bottom:32px;"></div>

          <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#fff;">ยินดีต้อนรับสู่ Kira Cards! ✨</h1>
          <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;">
            คุณอยู่ในรายชื่อเข้าถึงก่อนใครแล้ว เรากำลังสร้างประสบการณ์ TCG และการ์ดกีฬาระดับนักสะสมในประเทศไทย — คุณจะเป็นคนแรกที่รู้เมื่อเราเปิดตัว
          </p>

          <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#fff;">สิ่งที่คุณจะได้รับ:</h2>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:6px 12px 6px 0;color:#c850ff;font-size:18px;">🎴</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">สินค้าซีลและตรวจสอบแล้ว</strong> — Pokemon, One Piece TCG และการ์ดกีฬา Topps จากแหล่งที่โปร่งใส</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#4d9fff;font-size:18px;">⚡</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">จัดส่งรวดเร็ว</strong> — จัดส่งทั่วประเทศไทย</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#50ddb6;font-size:18px;">🏪</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">ออนไลน์และหน้าร้าน</strong> — ช้อปออนไลน์หรือมาเยี่ยมชมที่ภูเก็ต</td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#ffe150;font-size:18px;">🎁</td>
              <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;"><strong style="color:#fff;">สิทธิพิเศษก่อนใคร</strong> — ข้อเสนอพิเศษสำหรับคุณเมื่อเปิดตัว</td>
            </tr>
          </table>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:32px 0 8px;">
            <tr><td style="border-radius:100px;background:linear-gradient(135deg,#7c5cff,#5535ff);padding:14px 36px;">
              <a href="https://www.kira-cards.com" style="color:#fff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.5px;">เยี่ยมชม Kira Cards</a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:32px;">
          <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.2);">Kira Cards Co., Ltd. — ร้านค้า TCG และการ์ดกีฬาในประเทศไทย</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">ภูเก็ต, ประเทศไทย 🇹🇭</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

export async function POST(req: Request) {
  try {
    const { email, lang } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const isThai = lang === 'th'
    const defaultListId = parseInt(process.env.BREVO_LIST_ID || '2')
    const thaiListId = 5
    const listIds = isThai ? [thaiListId] : [defaultListId]

    // Add contact to Brevo list
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email,
        listIds,
        updateEnabled: true,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      if (data.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }
      return NextResponse.json({ error: data.message || 'Brevo error' }, { status: 500 })
    }

    // Send welcome email in the right language
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Kira Cards Co., Ltd.', email: 'contact@kira-cards.com' },
        to: [{ email }],
        subject: isThai
          ? 'ยินดีต้อนรับสู่ Kira Cards! ✨ คุณอยู่ในรายชื่อแล้ว'
          : 'Welcome to Kira Cards! ✨ You\'re on the list',
        htmlContent: isThai ? welcomeHtmlTh : welcomeHtmlEn,
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
