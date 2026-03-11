'use client'

import { useLang } from '../../useLang'

export default function PrivacyPolicy() {
  const { lang, toggle } = useLang()
  const isTh = lang === 'th'

  return (
    <div className="privacy-page">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
        <a href="/" className="privacy-back" style={{marginBottom:0}}>{isTh ? '← กลับหน้าหลัก' : '← Back to Home'}</a>
        <button className="lang-toggle" onClick={toggle} style={{position:'relative',top:0,right:0}}>{lang === 'en' ? '🇹🇭 TH' : '🇬🇧 EN'}</button>
      </div>
      <h1>{isTh ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</h1>
      <p className="privacy-updated">{isTh ? 'อัปเดตล่าสุด: 11 มีนาคม 2026' : 'Last updated: March 11, 2026'}</p>

      <section>
        <h2>{isTh ? '1. บทนำ' : '1. Introduction'}</h2>
        <p>{isTh
          ? 'ยินดีต้อนรับสู่ Kira Cards Co., Ltd. ("เรา" หรือ "ของเรา") เราเป็นร้านค้า TCG และการ์ดกีฬาที่กำลังจะเปิดตัวในภูเก็ต ประเทศไทย นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ เปิดเผย และปกป้องข้อมูลของคุณเมื่อคุณเยี่ยมชมเว็บไซต์ www.kira-cards.com ("เว็บไซต์")'
          : 'Welcome to Kira Cards Co., Ltd. ("we", "us", or "our"). We are an upcoming TCG and sports cards retailer based in Phuket, Thailand. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.kira-cards.com (the "Site").'}</p>
        <p>{isTh
          ? 'การใช้เว็บไซต์ของเราถือว่าคุณยอมรับการเก็บรวบรวมและใช้ข้อมูลตามนโยบายนี้'
          : 'By using our Site, you agree to the collection and use of information in accordance with this policy.'}</p>
      </section>

      <section>
        <h2>{isTh ? '2. ข้อมูลที่เราเก็บรวบรวม' : '2. Information We Collect'}</h2>
        <h3>{isTh ? 'ข้อมูลส่วนบุคคล' : 'Personal Information'}</h3>
        <p>{isTh ? 'เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลที่คุณให้โดยสมัครใจเมื่อคุณ:' : 'We may collect personal information that you voluntarily provide to us when you:'}</p>
        <ul>
          <li>{isTh ? 'สมัครรับการแจ้งเตือน (อีเมล)' : 'Subscribe to our notification list (email address)'}</li>
          <li>{isTh ? 'กรอกแบบฟอร์มติดต่อ (ชื่อ อีเมล ข้อความ)' : 'Fill out our contact form (name, email address, message)'}</li>
          <li>{isTh ? 'สั่งซื้อสินค้า (ชื่อ อีเมล ที่อยู่จัดส่ง เบอร์โทรศัพท์)' : 'Place an order through our store (name, email, shipping address, phone number)'}</li>
        </ul>
        <h3>{isTh ? 'ข้อมูลที่เก็บอัตโนมัติ' : 'Automatically Collected Information'}</h3>
        <p>{isTh ? 'เมื่อคุณเยี่ยมชมเว็บไซต์ เราอาจเก็บข้อมูลบางอย่างโดยอัตโนมัติ ได้แก่:' : 'When you visit our Site, we may automatically collect certain information, including:'}</p>
        <ul>
          <li>{isTh ? 'ประเภทและเวอร์ชันเบราว์เซอร์' : 'Browser type and version'}</li>
          <li>{isTh ? 'ระบบปฏิบัติการ' : 'Operating system'}</li>
          <li>{isTh ? 'เว็บไซต์ที่อ้างอิง' : 'Referring website'}</li>
          <li>{isTh ? 'หน้าที่เข้าชมและเวลาที่ใช้' : 'Pages visited and time spent'}</li>
          <li>{isTh ? 'ที่อยู่ IP' : 'IP address'}</li>
          <li>{isTh ? 'ข้อมูลอุปกรณ์' : 'Device information'}</li>
        </ul>
      </section>

      <section>
        <h2>{isTh ? '3. วิธีที่เราใช้ข้อมูลของคุณ' : '3. How We Use Your Information'}</h2>
        <p>{isTh ? 'เราใช้ข้อมูลที่เก็บรวบรวมเพื่อวัตถุประสงค์ดังต่อไปนี้:' : 'We use the information we collect for the following purposes:'}</p>
        <ul>
          <li>{isTh ? 'ส่งการแจ้งเตือนเกี่ยวกับการเปิดตัวและสินค้า' : 'To send you notifications about our launch and product availability'}</li>
          <li>{isTh ? 'ตอบคำถามและคำขอติดต่อ' : 'To respond to your inquiries and contact requests'}</li>
          <li>{isTh ? 'ดำเนินการและจัดส่งคำสั่งซื้อ' : 'To process and fulfill orders'}</li>
          <li>{isTh ? 'ปรับปรุงเว็บไซต์และประสบการณ์ผู้ใช้' : 'To improve our website and user experience'}</li>
          <li>{isTh ? 'ปฏิบัติตามข้อกำหนดทางกฎหมาย' : 'To comply with legal obligations'}</li>
          <li>{isTh ? 'ป้องกันการฉ้อโกงและรักษาความปลอดภัย' : 'To prevent fraud and ensure security'}</li>
        </ul>
      </section>

      <section>
        <h2>{isTh ? '4. การแบ่งปันข้อมูล' : '4. Sharing of Information'}</h2>
        <p>{isTh ? 'เราไม่ขาย แลกเปลี่ยน หรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม เราอาจแบ่งปันข้อมูลในกรณีต่อไปนี้เท่านั้น:' : 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:'}</p>
        <ul>
          <li>{isTh ? <><strong>ผู้ให้บริการ:</strong> เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่เชื่อถือได้ซึ่งช่วยเราในการดำเนินเว็บไซต์ ประมวลผลการชำระเงิน หรือจัดส่งสินค้า</> : <><strong>Service providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, processing payments, or delivering products.</>}</li>
          <li>{isTh ? <><strong>ข้อกำหนดทางกฎหมาย:</strong> เราอาจเปิดเผยข้อมูลหากกฎหมายกำหนดหรือตามคำร้องขอที่ถูกต้องจากหน่วยงานรัฐ</> : <><strong>Legal requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</>}</li>
          <li>{isTh ? <><strong>การโอนธุรกิจ:</strong> ในกรณีควบรวม ซื้อกิจการ หรือขายทรัพย์สิน ข้อมูลของคุณอาจถูกโอนเป็นส่วนหนึ่งของธุรกรรมนั้น</> : <><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</>}</li>
        </ul>
      </section>

      <section>
        <h2>{isTh ? '5. การเก็บรักษาข้อมูล' : '5. Data Retention'}</h2>
        <p>{isTh ? 'เราเก็บรักษาข้อมูลส่วนบุคคลของคุณเฉพาะเท่าที่จำเป็นเพื่อบรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบายนี้ เว้นแต่กฎหมายกำหนดให้เก็บรักษานานกว่า' : 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'}</p>
      </section>

      <section>
        <h2>{isTh ? '6. ความปลอดภัยของข้อมูล' : '6. Data Security'}</h2>
        <p>{isTh ? 'เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึง แก้ไข เปิดเผย หรือทำลายโดยไม่ได้รับอนุญาต อย่างไรก็ตาม ไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เน็ตที่ปลอดภัย 100%' : 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'}</p>
      </section>

      <section>
        <h2>{isTh ? '7. คุกกี้' : '7. Cookies'}</h2>
        <p>{isTh ? 'เว็บไซต์ของเราอาจใช้คุกกี้และเทคโนโลยีติดตามที่คล้ายกันเพื่อปรับปรุงประสบการณ์การท่องเว็บ คุณสามารถตั้งค่าเบราว์เซอร์ให้ปฏิเสธคุกกี้ได้ แต่บางฟีเจอร์อาจทำงานไม่เต็มที่' : 'Our Site may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of the Site may not function properly without them.'}</p>
      </section>

      <section>
        <h2>{isTh ? '8. ลิงก์บุคคลที่สาม' : '8. Third-Party Links'}</h2>
        <p>{isTh ? 'เว็บไซต์ของเราอาจมีลิงก์ไปยังเว็บไซต์บุคคลที่สาม (เช่น โซเชียลมีเดีย ผู้ให้บริการชำระเงิน) เราไม่รับผิดชอบต่อนโยบายความเป็นส่วนตัวของเว็บไซต์ภายนอกเหล่านั้น' : 'Our Site may contain links to third-party websites (e.g., social media platforms, payment processors). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.'}</p>
      </section>

      <section>
        <h2>{isTh ? '9. ความเป็นส่วนตัวของเด็ก' : "9. Children's Privacy"}</h2>
        <p>{isTh ? 'เว็บไซต์ของเราไม่ได้มีเจตนาสำหรับเด็กอายุต่ำกว่า 13 ปี เราไม่เก็บรวบรวมข้อมูลส่วนบุคคลจากเด็กอายุต่ำกว่า 13 ปีโดยเจตนา หากคุณเชื่อว่าเราเก็บข้อมูลจากเด็ก กรุณาติดต่อเราทันที' : 'Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can take appropriate action.'}</p>
      </section>

      <section>
        <h2>{isTh ? '10. สิทธิ์ของคุณ' : '10. Your Rights'}</h2>
        <p>{isTh ? 'คุณอาจมีสิทธิ์ดังต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของคุณ:' : 'Depending on your location, you may have the following rights regarding your personal data:'}</p>
        <ul>
          <li>{isTh ? 'เข้าถึงและรับสำเนาข้อมูลส่วนบุคคล' : 'Access and receive a copy of your personal data'}</li>
          <li>{isTh ? 'ขอแก้ไขข้อมูลที่ไม่ถูกต้อง' : 'Request correction of inaccurate data'}</li>
          <li>{isTh ? 'ขอลบข้อมูลส่วนบุคคล' : 'Request deletion of your personal data'}</li>
          <li>{isTh ? 'คัดค้านหรือจำกัดการประมวลผลข้อมูล' : 'Object to or restrict the processing of your data'}</li>
          <li>{isTh ? 'ถอนความยินยอมได้ตลอดเวลา' : 'Withdraw consent at any time'}</li>
          <li>{isTh ? 'ยกเลิกการสมัครรับการแจ้งเตือนได้ตลอดเวลา' : 'Unsubscribe from our notification list at any time'}</li>
        </ul>
        <p>{isTh ? 'หากต้องการใช้สิทธิ์เหล่านี้ กรุณาติดต่อเราตามข้อมูลด้านล่าง' : 'To exercise any of these rights, please contact us using the information below.'}</p>
      </section>

      <section>
        <h2>{isTh ? '11. การปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)' : '11. Thailand PDPA Compliance'}</h2>
        <p>{isTh ? 'เราปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย เราเก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลตามวัตถุประสงค์ที่ชอบด้วยกฎหมาย เช่น ความยินยอม ความจำเป็นตามสัญญา และข้อผูกพันทางกฎหมาย คุณมีสิทธิ์ร้องเรียนต่อหน่วยงานที่เกี่ยวข้องหากเชื่อว่าสิทธิ์ในการคุ้มครองข้อมูลของคุณถูกละเมิด' : "We comply with Thailand's Personal Data Protection Act (PDPA). We collect and process personal data based on legitimate purposes such as consent, contractual necessity, and legal obligations. You have the right to lodge a complaint with the relevant Thai authorities if you believe your data protection rights have been violated."}</p>
      </section>

      <section>
        <h2>{isTh ? '12. การเปลี่ยนแปลงนโยบายนี้' : '12. Changes to This Policy'}</h2>
        <p>{isTh ? 'เราอาจอัปเดตนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงจะถูกโพสต์บนหน้านี้พร้อมวันที่ "อัปเดตล่าสุด" ที่ปรับปรุงแล้ว' : 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.'}</p>
      </section>

      <section>
        <h2>{isTh ? '13. ติดต่อเรา' : '13. Contact Us'}</h2>
        <p>{isTh ? 'หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่:' : 'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:'}</p>
        <ul>
          <li><strong>{isTh ? 'อีเมล:' : 'Email:'}</strong> contact@kira-cards.com</li>
          <li><strong>{isTh ? 'โทรศัพท์:' : 'Phone:'}</strong> +66 62 096 0153</li>
          <li><strong>{isTh ? 'ที่ตั้ง:' : 'Location:'}</strong> {isTh ? 'ภูเก็ต, ประเทศไทย' : 'Phuket, Thailand'}</li>
        </ul>
      </section>
    </div>
  )
}
