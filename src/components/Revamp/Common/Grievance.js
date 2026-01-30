import React from 'react'
import TopStrip from './TopStrip'

const Grievance = () => {
  const topString = 'Grievance';
  return (
    <div className='test-pref-details'>
      <TopStrip topInfoText={topString} goBackStatus={false} />
      <div className='static__container container xsmall-width'>
        <p>Welcome to ApplyUniNow’s Grievances and Disclaimer,</p>

          <p>Raise your concern!<br />
          We are committed to providing our students with an uninterrupted learning experience. Should you encounter any difficulties or require assistance, our dedicated support team is available to provide timely and effective guidance.</p>

          <p>For any grievances concerning ApplyUniNow services, including student placement and recruitment assistance, as well as study, visit, or work visa application assistance, kindly raise your concern, and we will be delighted to provide the most appropriate assistance. Upon receipt of your concern, we will promptly respond within one business day and propose a resolution within two business days.</p>

          <p><strong>NOTE:</strong> This applies only if you have availed any of the ApplyUniNow India services.</p>

          <p>If you are contacting us for the first time, please send an email to your assisting counsellor and if you do not receive a response from our end within the stipulated time or are unsatisfied with the resolution provided, please forward the linked email thread to escalate your concern to our management at <a href="mailto:support@applyuninow.com">support@applyuninow.com</a></p>

          <p>Please be advised that when following up on a previous grievance, you must provide detailed information, relevant references, and documentation.</p>


          <h2>DISCLAIMER</h2>
          <p>ApplyUniNow strives to adhere to the highest standards of positive practices and ensures that the information provided on this website is as accurate as possible. Nevertheless, it is important to note that the information presented on this website is provided on an “as is” basis, without any express or implied warranty. Therefore, there is no guarantee given regarding the accuracy or currency of any specific item on this website.</p>

          <p>Individuals who require confirmation of information should refer to the ApplyUniNow source for information on this website or contact an ApplyUniNow representative. ApplyUniNow assumes no responsibility for any loss or damage resulting from the use of information published on the website or from any access to the website. All access and use are at the user’s risk. ApplyUniNow does not guarantee the absence of viruses, malware, Trojan horses, or other malicious software on this website or any linked websites. We recommend that users obtain appropriate virus protection and thoroughly scan for such viruses before accessing or downloading any content.</p>

          <h2>ApplyUniNow Copyright</h2>
          <p>The material on this Website, including all information such as text, graphics, images, photographs and sound, is protected by copyright pursuant to the Copyright Act as amended from time to time and the laws of other countries. You must not alter, reproduce, store in retrieval system or transmit the material on this Website or any part thereof, unless authorized by ApplyUniNow in writing or permitted.</p>


          <h2>Trade marks</h2>
          <p>All trademarks included on this website are the exclusive property of their respective owners and are protected by applicable laws. Unauthorized use of any of these trademarks (including reproduction, modification, distribution, repudiation, display, or communication) is prohibited. Personal non-commercial use of these trademarks may be permitted by saving or printing a copy of this website. However, express written authorization from ApplyUniNow or the owner of the relevant trademark is required for any other use.</p>


          <h2>Links from this Website</h2>
          <p>The external websites linked within the website are not under the control of ApplyUniNow. ApplyUniNow does not assume responsibility for the content or currency of any externally linked sites. A link on the website does not imply endorsement by ApplyUniNow of the linked website or a relationship with the organization linked.</p>


          <h2>Prohibited Content</h2>
          <p>When using ApplyUniNow User-generated websites, you agree not to upload, post, or transmit any Content that: (a) is unlawful, harmful, threatening, defamatory, obscene, infringing, harassing, offensive, or discriminatory; (b) violates any applicable laws or regulations; (c) infringes any intellectual property rights, privacy rights, or other rights of any third-party; or (d) contains viruses, malware, or any other harmful code that could damage or interfere with ApplyUniNow’s Websites, systems or data.</p>

          <p>ApplyUniNow reserves the exclusive right to monitor, review, and, at its sole discretion, remove any content that violates these Terms of Use or that ApplyUniNow otherwise deems inappropriate.</p>
      </div>
    </div>
  )
}

export default Grievance
