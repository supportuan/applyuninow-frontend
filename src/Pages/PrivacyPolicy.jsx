import { Header } from "../components/Header";
import "../App.css";
import Particles from "react-tsparticles";

const PrivacyPolicy = () => {
  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 700,
        },
      },

      color: {
        value: "#b9cdf0",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#b9cdf0",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 0.1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 10,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#b9cdf0",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
  };

  return (
    <div className="App bg-lightWhite">
      <Particles params={options} />
      <Header />

      <section className="privacy-policy">
        <div className="container">
          <div className="content-heading px-4 md:px-0">
            <h4>Terms and Conditions</h4>
            <p>
              Confidence, like art, never comes from having all the answers it
              comes{" "}
            </p>
            <p>from being open to all the questions.</p>
          </div>
          <div className="content-section p-4 md:p-8 mb-6">
            <h4>I hereby solemnly and sincerely declare: </h4>
            <ol type="1">
              <li>
                That all my documents like Mark-sheets, Transcripts,
                Certificates, Bank Statements, Income- tax return papers etc
                submitted/used for my student application are genuine.
              </li>
              <li>
                I state under the oath that all the documents are genuine and
                have been procured from the sources directly by me from
                respective boards, college, institutes, school or university.{" "}
              </li>
              <li>
                I am solemnly responsible and ready to face the consequences for
                my incorrect or fraudulent information, if found any. I am
                answerable to any of the queries regarding all the documents
                submitted by me.
              </li>
              <li>
                I have understood all the information provided to me by the
                representative of the school, college or university abroad and
                have verified it by myself through the official website of the
                respective institute, country and its laws.{" "}
              </li>
              <li>
                I understand that the overseas institute’s representative is
                only a facilitator who facilitates/guides for the admission
                procedure.{" "}
              </li>
              <li>
                I have understood the refund policy of the tuition fees by the
                institute I am applying to. I agree on the refund policy terms
                and I understand to make all the school/college/institute’s
                tuition fees transferred directly to the overseas institution or
                the organization I am applying to.{" "}
              </li>
              <li>
                I understand that the representative is not responsible for the
                refund of any tuition fees paid to the overseas school, college
                or institute I have applied to. I also agree & understand the
                service charges against my admission/application process, this
                charges are non-refundable as it is against the service been
                provided to me for my admission process for my selected course &
                university/school/institute.{" "}
              </li>
              <li>
                The course, institute and the country selection is purely my
                responsibility and after understanding everything I myself have
                taken the decision to apply for the admission at the institute
                and have submitted the visa application for the same to the
                country’s consulate, high commission or embassy.{" "}
              </li>
              <li>
                I understand that there will not be any Refund of Tuition fee
                once the Student Visa is granted to me and I will not change the
                institute till my course completion without the written
                permission from the college, university or institute I have
                applied to after landing in the selected country I have applied
                for.{" "}
              </li>
              <li>
                I agree & confirm that my representative helps me with only my
                admission process & holds no responsibility of getting me a work
                at foreign country /stay back at foreign country/lodging at
                foreign country/ travel etc once the visa has been granted. I
                also confirm that my representative do not holds any
                responsibility of my acts after I get Visa/ I reach to the
                chosen country.{" "}
              </li>
              <li>
                OPTIONAL : I fully authorize my representative to use my visa
                details and photograph if they want to do the
                marketing/advertisement and state that they will not need to
                take any further permission from me or from my family or
                outsources.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-heading px-4 md:px-0">
            <h4>Privacy Policy</h4>
            <p>
              Confidence, like art, never comes from having all the answers it
              comes{" "}
            </p>
            <p>from being open to all the questions.</p>
          </div>
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Introduction</h4>
            <p>
              APPLY UNINOW respects your right to privacy. This privacy notice
              explains who we are, how we collect, share and use personal
              information about you, and how you can exercise your privacy
              rights. This Privacy Notice applies to data collected about all
              users of www.applyuninow.com and websites of our subsidiary
              companies, and other related websites, (the “1””2””3””4”) and the
              services available on the Website (the “1””2””3””4”).
            </p>
            <p>
              The terms “the Company,” “we,” “us,” “our,” and “ours” refer to
              APPLY UNINOW. The terms “you,” “your,” and “yours” refer to the
              user or viewer of the Website or user of the Services, as
              applicable.
            </p>
            <p>
              APPLY UNINOW reserves the right to make changes periodically to
              this Privacy Notice at our sole discretion. Changes to the Privacy
              Notice will be posted on this page.
            </p>
            <p>
              If you have any questions or concerns about our use of your
              personal information, please contact us using the contact details
              provided at the bottom of this Privacy Notice.
            </p>
            <p>
              This Privacy Notice explains the categories of personal data we
              may collect about you, it also explains the purpose of processing
              your data and how we keep it safe.
            </p>
            <p>
              We know that there’s a lot of information here, but we want you to
              be informed about your rights, and how we use data across the
              APPLY UNINOW companies to provide you with the best possible
              service.
            </p>
            <p>
              For your convenience we have split the information into manageable
              sections which we hope will answer any questions you have but if
              not, please do get in touch with us.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Who is APPLYUNINOW?</h4>
            <p>
              APPLYUNINOW LIMITED is a global education provider (12731878). Our
              head office is located in England, London. The Company has
              subsidiary companies and affiliated organisations operating in
              India and USA collectively called the “Company”.
            </p>
            <p>
              The following link will provide you with further details of the
              company: www.APPLYUNINOW.com
            </p>
            <p>
              For ease of reading this notice the “Company” will be referred to
              as “we” and “us” in this notice.
            </p>
            <h5>
              Explaining the legal basis for processing your personal data:
            </h5>
            <p>
              The Company is a global company and understands that the laws on
              data protection may be different in different countries, however,
              the Company has set out below a number of different reasons for
              which we may collect and process your personal data, including:
            </p>
            <h5>Consent:</h5>
            <ol type="a">
              <li>
                In specific situations, we can collect and process your data
                with your consent for example, when you tick a box to receive
                marketing material from us.
              </li>
              <li>
                When collecting your personal data, we’ll endeavour to collect
                the minimum necessary for us to provide our services.
              </li>
            </ol>
            <h5>Parental Consent:</h5>
            <ol type="a">
              <li>
                Depending upon national and sometimes state law you may be
                called a “minor” when it comes to signing a contract or
                consenting for us to collect and process your personal data.
                This means you have not reached the legal age of consent.
              </li>
              <li>
                In most of the countries, it is usual to require a person to be
                18 years of age to have reached the legal age of consent.{" "}
              </li>
              <li>
                In Europe it is usual that a person is 16 years of age, 13 in
                the U.K. to consent to receive marketing information. As part of
                protecting you and your rights, if the law says you are still a
                “minor”, we require your parents/guardians consent to directly
                collect and process your data via online services.
              </li>
            </ol>
            <h5>Explicit Consent:</h5>
            <ol type="a">
              <li>
                Explicit Consent means that you have been presented with an
                option to agree or disagree with the collection, use, or
                disclosure of personal information.{" "}
              </li>
              <li>
                If we need to collect special categories of data from you in
                order to provide you with the services you require or meet our
                legal obligations, we will collect this data on the basis of
                your explicit consent, national/regional social protection laws
                or for statistical reporting purposes requested by official
                bodies.
              </li>
              <li>
                The special category data that we may request from you includes
                details such as your racial or ethnic origin and passport or
                birth certificate because they are necessary to satisfy
                enrolment or visa requirements. We may also need to collect data
                concerning your health (eg medical check reports and
                immunisation history) to provide additional support to you.
              </li>
            </ol>
            <h5>Contractual obligations:</h5>
            <ol type="a">
              <li>
                In certain circumstances we will need to collect your personal
                data to meet our contractual obligations to you.
              </li>
              <li>
                We will collect this data so that we can make an offer to you to
                study or enrol with us or to work with us.
              </li>
              <li>
                We will use this data to establish a contract that sets out your
                obligations as a enrolling student or employee and our
                obligations as the provider of the study services or employment
                to you.
              </li>
            </ol>
            <h5>Legal compliance:</h5>
            <ol type="a">
              <li>
                If the law requires us to, we may need to collect and process
                your data for a number of reasons, for example to:
              </li>
              <ul>
                <li>Prevent fraud</li>
                <li>Meet the needs of immigration authorities</li>
                <li>Comply with Consumer Protection law</li>
              </ul>
            </ol>
            <h5>Legitimate interest:</h5>
            <ol type="a">
              <li>
                In specific situations, we collect your personal data as part of
                undertaking our legitimate interests in a way which might
                reasonably be expected as part of running our business and,
                which does not materially impact your rights, freedom or
                interests. It might include:
              </li>
              <ul>
                <li>
                  Staying in touch with you for purposes of staying in touch
                  with enrolled / ex-students as part of an alumni programme
                </li>
                <li>
                  Keeping you informed regarding Company highlights and news
                </li>
              </ul>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              When do we collect your Personal Data?
            </h4>
            <ol type="a">
              <li>Your contact details i.e. your:</li>
              <li>
                When you complete our online or paper/PDF application forms.
              </li>
              <li>When you engage with us on social media.</li>
              <li>
                When you contact us by any means with queries, comments etc.
              </li>
              <li>When you book any kind of appointment with us. </li>
              <li>When you book to attend an event. </li>
              <li>
                When you’ve given a third-party permission to share with us the
                information they hold about you.
              </li>
              <li>
                When you attend a college, campus or office, which may have CCTV
                systems operating for the security of both enrolled. / enrolling
                Students, Visitors and Staff. These systems may record your
                image during your visit.
              </li>
              <li>
                When you engage with our online learning tools such as Moodle,
                and attend our online delivery through tools such as Zoom.
              </li>
              <li>
                For employees we collect your personal data throughout the
                period of your employment with the Company
              </li>
            </ol>
            <h5 className="instroduction">
              Categories of Personal Data we collect
            </h5>
            <ol type="a">
              <li>Your contact details i.e. your:</li>
              <ul className="list-view">
                <li>Name</li>
                <li>Gender</li>
                <li>Date of birth</li>
                <li>
                  Postal address (can be a postal box number and/or a street
                  address)
                </li>
                <li>Social media contacts</li>
                <li>Telephone number/s (mobile and landline)</li>
              </ul>
              <li>Your contact details i.e. your:</li>
              <ul className="list-view">
                <li>Identity and Immigration documentation i.e. your:</li>
                <li>Passport</li>
                <li>Driver&apos;s licence</li>
                <li>Identity card</li>
                <li>Visa details</li>
                <li>Your bank account details.</li>
              </ul>
              <li>Details of your interactions with us, such as:</li>
              <ul className="list-view">
                <li>
                  We collect details of enquiries and comments you make in the
                  web pages you visit or when you contact us by email, telephone
                  or in person
                </li>
                <li>
                  Information gathered by the use of ‘cookies’ in your web
                  browser. (Learn more about our ‘Cookies policy’
                </li>
              </ul>
              <li>Additionally, for employment purposes:</li>
              <ul className="list-view">
                <li>Social security (or equivalent) details</li>
                <li>Next of Kin details</li>
                <li>Health information</li>
                <li>Your image, voice and written contributions</li>
                <li>
                  As you interact with our website and other platforms made
                  available by the company, we may automatically collect
                  technical data about your equipment, browsing actions and
                  patterns.
                </li>
              </ul>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Why we use your Personal Data?</h4>
            <ol type="a">
              <li>
                To ensure that we provide you with the information and service
                you need we sometimes combine the data we have about you. This
                is allowed as part of our legitimate interest to provide you
                with the optimum service.
              </li>
              <li>
                If you wish to change how we use your data, you’ll find details
                in the ‘What are my rights?’ section below.
              </li>
              <li>
                If you choose not to share your personal data with us, or refuse
                certain contact permissions, we might not be able to provide
                some or all of the services you’ve asked for. In this case we
                will contact you to confirm your request.
              </li>
              <li>The reasons we use your personal data include:</li>
              <ul className="list-view">
                <li>
                  To operate and administer our business to provide you with the
                  best possible service. This is done on the basis of our
                  legitimate business interests.
                </li>
                <li>To respond to your queries and requests. </li>
                <li>
                  We may keep a record of communication with you. We do this on
                  the basis of our contractual obligations to you, our legal
                  obligations and our legitimate interests in providing you with
                  the best service.{" "}
                </li>
                <li>
                  To protect our business and you from fraud and other illegal
                  activities.{" "}
                </li>
                <li>
                  We’ll also monitor your browsing activity with us to quickly
                  identify and resolve any problems and protect the integrity of
                  our websites. We’ll do all of this as part of our legitimate
                  interest.{" "}
                </li>
                <li>
                  To protect our enrolling students, visitors and staff,
                  premises and assets, we operate CCTV systems in some of our
                  colleges, campuses and offices which record images for
                  security. We do this on the basis of our legitimate business
                  interests.
                </li>
                <li>
                  To process payments and to prevent fraudulent transactions.
                  This is done on the basis of our legitimate business interests
                  and to help protect you from fraud.{" "}
                </li>
                <li>
                  With your consent, we will use your personal data preferences,
                  to keep you informed by email, web, text, social media and
                  telephone about relevant services and events.
                </li>
                <li>
                  To protect your vital interests if you become unable to
                  provide consent.
                </li>
                <li>
                  To hire and manage employees and contractors. We do this as
                  part of our contract with you.
                </li>
                <li>
                  To send you communications required by law or which are
                  necessary to inform you about our changes to the services we
                  provide you. (For example, updates to this Privacy Notice).
                  These service messages will not include any marketing content
                  and do not require prior consent when sent by email or text
                  message. We need to keep you informed as part of complying
                  with our legal obligations.
                </li>
                <li>
                  To comply with our contractual or legal obligations to share
                  data with law enforcement if necessary, for example: If a
                  court order is presented that requires us to share your
                  personal data with law enforcement agencies or courts of law
                </li>
              </ul>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              How we look after your Personal Data?
            </h4>
            <ol type="a">
              <li>
                We know how much data security matters. We will treat your data
                with the utmost care and respect and take all appropriate steps
                to protect it.
              </li>
              <li>
                We secure access to all transactional areas of our websites and
                apps using ‘https’ technology.
              </li>
              <li>
                Access to your personal data is restricted and secure, and
                sensitive personal data such as health information is secured
                via password protection and encryption.
              </li>
              <li>
                Storage systems for paper copies are secured and access is
                managed through the Company’s access protocols.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              How long do we keep your Personal Data?
            </h4>
            <ol type="a">
              <li>
                We have a detailed records management programme in place and all
                records (paper and electronic) are required to be managed in
                accord with its security and disposal steps.
              </li>
              <li>
                Whenever we collect or process your personal data, we will store
                it safely and only for as long as is necessary for the original
                purpose for which it was collected or as required by law.
              </li>
              <li>
                At the end of the documented retention period, your data will
                either be deleted completely or anonymised.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Sharing your Personal Data</h4>
            <h5 className="sec-pad">
              We share your Personal Data with trusted Third Parties
            </h5>
            <ol type="a">
              <li>
                We sometimes share your personal data with trusted third parties
                to provide services and business functions. An example of a
                third party would be a APPLYUNINOW contracted education agency
                in and/or a University Partner.
              </li>
              <li>
                We set very clear directions and expectations for those
                organisations regarding the safety and protection of your
                privacy and personal data.
              </li>
              <li>
                The directions and expectations are set out in our contract with
                the third party and include:
                <ul className="list-view">
                  <li>
                    Providing them only the information they need to perform
                    their specific services
                  </li>
                  <li>
                    Setting out the purpose for which the personal data is being
                    shared
                  </li>
                  <li>
                    Confirmation that they will make every reasonable effort to
                    ensure that your privacy is respected and protected
                  </li>
                  <li>
                    If we stop using their services, they will undertake to
                    either securely delete or render anonymous any of your
                    personal data held by them
                  </li>
                  <li>
                    They will inform us immediately in the event of a suspected
                    or actual breach being detected.
                  </li>
                </ul>
              </li>
            </ol>
            <h5>The types of third parties we work with include:</h5>
            <ol type="a">
              <li>Educational Agents</li>
              <li>IT companies supporting our websites</li>
              <li>Cloud storage companies</li>
              <li>Customer Relationship Management application providers</li>
              <li>Educational establishments</li>
              <li>Educational professionals</li>
              <li>Regulatory authorities</li>
              <li>Accommodation providers</li>
              <li>General service</li>
              <li>Online webinar providers</li>
              <li>Insurers</li>
              <li>Financial service providers</li>
              <li>Travel service providers</li>
              <li>Migration Agents</li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              How do third party partners use your Personal Data?
            </h4>
            <p>
              When you use a service from one of our chosen partners, your data
              will be collected and used by them under the terms of their own
              separate privacy policies.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              Why do we share your Personal Data?
            </h4>
            <ol type="a">
              <li>
                We need to share your personal data with trusted third parties
                in order to meet legal and regulatory obligations and fulfil our
                contractual promise to you.
              </li>
              <li>
                We will only share your data with third parties in very specific
                circumstances, for example:
                <ul className="list-view">
                  <li>
                    With your consent, given at the time you supplied your
                    personal data, to us, we may pass that data to a third party
                    for their direct marketing purposes.
                  </li>
                  <li>
                    When working with academic professionals as part of ensuring
                    the delivery of high quality services to you.
                  </li>
                  <li>
                    We may share information about fraudulent or potentially
                    fraudulent activity in our premises or systems. This may
                    include sharing data about individuals with law enforcement
                    bodies.
                  </li>
                  <li>
                    If we receive a valid request from the police or other law
                    enforcement agency, regulatory or Government authority in
                    your country of origin or elsewhere, we may be required to
                    disclose your personal data.
                  </li>
                  <li>
                    We may, from time to time, expand, reduce or sell the
                    Company and this may involve the transfer of business
                    entities or the whole business to new owners. If this
                    happens, your personal data will, where relevant, be
                    transferred to the new owner or controlling party, under the
                    terms of this Privacy Notice.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              Processing and Transferring your Personal Data
            </h4>
            <ol type="a">
              <li>
                We have operations in many different geographic regions and our
                head office is in England, UK - therefore, we will sometimes
                need to share your personal data across national boundaries and
                borders for Institutional application and admission purposes for
                example:
                <ul className="list-view">
                  <li>outside the European Economic Area (EEA)</li>
                  <li>between North America and Australia</li>
                  <li>Asia and Australia</li>
                  <li>New Zealand and Australia</li>
                  <li>Canada and Australia</li>
                  <li>Europe and Australia</li>
                </ul>
              </li>
              <li>
                The transfer of data, inclusive of personal data, may include
                transferring it to:
                <ul className="list-view">
                  <li>Our head office or channel partners in England, UK.</li>
                  <li>
                    Other Company businesses and elsewhere within the Company’s
                    global structure (intra-company transfers)
                  </li>
                </ul>
              </li>
              <li>
                If we do transfer your personal data across an international
                border, we have procedures in place to ensure your data receives
                the same protection as if it were being processed inside your
                country of residence.For further information on the transfer of
                your personal data you can contact us.
              </li>
              <li>
                For further information on the transfer of your personal data
                you can contact us.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">
              Your rights over your Personal Data explained{" "}
            </h4>
            <ol type="a">
              <li>
                We need you to understand the rights you have when it comes to
                your personal information.
              </li>
              <li>
                Not all countries extend the same rights under their respective
                privacy regulation. The examples of rights available under
                privacy regulation noted below, show how those rights vary
                across the world and the many different nations in which the
                Company operates. We have set out a few of these below for your
                information.
              </li>
              <li>
                If your country is not listed below, please contact us for
                further information. In your email please set out the country
                and region within that country you are enquiring about, in order
                that we can provide you with the right information.
              </li>
              <li>
                The rights you have may be different depending on where you live
                in the world for instance, in the EU, EEA or the UK you have the
                right to:
                <ul className="list-view">
                  <li>Access and review personal data we hold about</li>
                  <li>
                    Rectify/correct any inaccurate personal information we hold
                    about you.
                  </li>
                  <li>
                    Request a copy of data you supplied to us, in a machine
                    readable format or for the transfer of this data to another
                    company
                  </li>
                  <li>
                    Request the restriction of processing of your personal data
                  </li>
                  <li>Object to us processing your personal data</li>
                  <li>
                    Request the erasure of your data, (right to be forgotten)
                  </li>
                </ul>
              </li>
              <li>For any of these EU/EEA/UK requests please contact us. </li>
              <li>
                If you live in Australia you have the right to:
                <ul className="list-view">
                  <li>Request anonymity and pseudonymity</li>
                  <li>
                    Request for information not to be used for marketing
                    purposes
                  </li>
                  <li>Access and review personal data we hold about you</li>
                  <li>
                    Rectify/Correct any inaccurate personal information we hold
                    about you
                  </li>
                </ul>
              </li>
              <li>
                If you live in New Zealand or Canada you have the right to:
                <ul className="list-view">
                  <li>Access and review personal data we hold about you</li>
                  <li>Rectify/Correct personal data we hold about you</li>
                </ul>
              </li>
              <li>
                If you live in the United States of America you have the right
                to:
                <ul className="list-view">
                  <li>Access and review personal data we hold about you</li>
                  <li>Rectify/Correct personal data we hold about you</li>
                  <li>Be informed of any disclosures</li>
                </ul>
              </li>
              <li>
                Certain residents of US States may have additional privacy
                rights including certain California residents under the
                California Consumer Privacy Act (CCPA). Such rights include a
                right to:
                <ul className="list-view">
                  <li>
                    Obtain information about personal data that we may collect,
                    share or sell
                  </li>
                  <li>
                    Request deletion of certain personal data we hold about you
                  </li>
                  <li>
                    Opt-out from the sale of personal data relating to you
                  </li>
                  <li>
                    Not be discriminated against for the exercise of legal
                    privacy rights
                  </li>
                </ul>
              </li>
              <li>
                For any privacy rights in regions/countries/states outside of
                Europe please contact us.{" "}
              </li>
              <li>
                For an explanation of your rights in the country in which you
                live, work or study with one of our business entities please
                contact us. Set out the nature of your request and the Company
                will inform you of how it is able to assist you. Please note
                that the same rights do not apply in all of our operating
                regions, countries or states.
              </li>
              <li>
                All requests related to your rights and your personal data, will
                be examined in detail and a member of the Privacy team will
                respond to you as quickly as possible.
              </li>
              <li>
                We will make all reasonable efforts to meet with your request
                and will keep you informed as to our progress in getting the
                information to you in a format that is acceptable and usable.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Withdrawal of consent</h4>
            <p>
              Whenever you have given us your consent to use your personal data,
              you have the right to change your mind at any time and withdraw
              that consent.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Legitimate interest</h4>
            <p>
              In cases where we are processing your personal data on the basis
              of our legitimate interest, you can ask us to stop for reasons
              connected to your individual situation.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Marketing</h4>
            <ol type="a">
              <li>
                You have the right to stop the use of your personal data for
                marketing activity through all channels, or selected channels.
              </li>
              <li>
                We will always comply with your request. To action this:
                <ul className="list-view">
                  <li>
                    Click the ‘unsubscribe’ link in any email communication that
                    we send you{" "}
                  </li>
                  <li>
                    We will then stop any further emails from being sent to you
                  </li>
                </ul>
              </li>
              <li>
                Please note that you may continue to receive communications for
                a short period after changing your preferences while our systems
                are fully updated.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-section p-4 md:p-8 mb-6">
            <h4 className="instroduction">Questions or Issues you may have</h4>
            <ol type="a">
              <li>
                If you require any further information we will be pleased to
                provide you with further detail.
              </li>
              <li>
                If you are contacting us to complain about an alleged breach of
                this Privacy Notice or our legal privacy obligations, please
                provide us with as much detail as possible in relation to your
                complaint so that we can deal with your concern quickly and
                effectively.
              </li>
              <li>
                We will take every privacy complaint seriously and assess it
                with the aim of resolving all issues quickly and efficiently.
              </li>
              <li>
                We’d be grateful for your cooperation with us during this
                process by providing us with any relevant information that we
                may need.
              </li>
            </ol>
          </div>
        </div>
        <div className="container">
          <div className="content-heading px-4 md:px-0">
            <h4>Disclaimer</h4>
            <p>
              Confidence, like art, never comes from having all the answers it
              comes{" "}
            </p>
            <p>from being open to all the questions.</p>
          </div>
          <div className="content-section p-4 md:p-8 mb-6">
            <p>
              While Apply4Graduation has attempted to make the information on
              this server as accurate as possible, the information on this
              website including other owned domains (WWW.APPLY4GRADUATION.COM,
              WWW.APPLYUNINOW.COM, WWW.ADMITSCONNECT.COM, WWW.UNIFEATURES.COM,
              WWW.INTERNATIONALSTUDENTVISAS.COM) server is for personal and/or
              educational use only and is provided in good faith without any
              express or implied warranty.
            </p>
            <p>
              There is no guarantee given as to the accuracy of any individual
              item on the website WWW.APPLY4GRADUATION.COM, WWW.APPLYUNINOW.COM,
              WWW.ADMITSCONNECT.COM, WWW.UNIFEATURES.COM,
              WWW.INTERNATIONALSTUDENTVISAS.COM individuals accessing the
              websites who require confirmation of any information should refer
              to sourcing the information for this website. Apply4Graduation
              does not accept responsibility for any loss or damage occasioned
              by use of the information contained on the server nor from any
              access to the server. While Apply4Graduation will make every
              effort to ensure the availability and integrity of its resources,
              it cannot guarantee that these will always be available, and/or
              free of any defects, including viruses. Users should take this
              into account when accessing the resources. All access and use is
              at the risk of the user.
            </p>
            <p>
              Apply4Graduation may or has provided hypertext links to a number
              of other websites as a service to users of this website. This
              service does not mean that may endorses those sites or material on
              them in any way. Apply4Graduation is not responsible for the use
              of a hypertext link for which a commercial charge applies.
              Individual users are responsible for any charges that their use
              may incur.
            </p>
            <p>
              THE ABOVE DEFINATIONS ARE ALSO APPLICABE FOR THE BELOW DOMAINS
              THAT ARE OWNED TOGETHER: WWW.APPLY4GRADUATION.COM,
              WWW.APPLYUNINOW.COM, WWW.ADMITSCONNECT.COM, WWW.UNIFEATURES.COM,
              WWW.INTERNATIONALSTUDENTVISAS.COM.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
