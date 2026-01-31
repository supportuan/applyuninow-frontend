import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Appcontext";

export const TermsAndCondition = () => {
  const [done, setDone] = useState(false);
  const [accept, setaccept] = useState(false);

  const navigate = useNavigate();

  const { BASE_URL } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('terms_token')

  const loginId = JSON.parse(localStorage.getItem("loginId"));

  const handleClick = (e) => {
    setDone(!done);
  };

  const handleClickDone = () => {
    setLoading(true)
    axios
      .put(
        `${BASE_URL}/admin/users/update-policy-accept/${loginId}`,
        { accepted: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        let user = response.data.data;
        localStorage.setItem("applyNow", JSON.stringify(user));
        localStorage.setItem("token", user.token.token);
        setaccept(!accept);
        navigate("/applicant/profile/view");

      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };
  return (
    <div
      className={` model-container text-white bg-bgblack m-5 p-5 rounded-xl w-full md:w-[600px] absolute z-10 ml-auto mr-auto left-0 right-0 top-10 ${accept ? "hidden" : ""
        } `}
    >
      <h1 className="text-center font-semibold text-xl mb-3">
        Terms & Conditions and Privacy Policy
      </h1>
      <div className=" p-5 bg-tab rounded-xl flex flex-col gap-4 text-sm lg:text-xs max-h-[400px] overflow-auto ">

        <h2 className="font-semibold ">
          I hereby solemnly and sincerely declare:
        </h2>
        <p>
          a{")"} That all my documents like Mark-sheets, Transcripts,
          Certificates, Bank Statements, Income- tax return papers etc
          submitted/used for my student application are genuine.
        </p>
        <p>
          b{")"} I state under the oath that all the documents are genuine and
          have been procured from the sources directly by me from respective
          boards, college, institutes, school or university.
        </p>
        <p>
          c{")"} I am solemnly responsible and ready to face the consequences
          for my incorrect or fraudulent information, if found any. I am
          answerable to any of the queries regarding all the documents submitted
          by me.
        </p>
        <p>
          d{")"} I have understood all the information provided to me by the
          representative of the school, college or university abroad and have
          verified it by myself through the official website of the respective
          institute, country and its laws.
        </p>
        <p>
          e{")"} I understand that the overseas institute’s representative in
          India is only a facilitator who facilitates/guides for the admission
          procedure.
        </p>

        <div>
          <h2 className="font-semibold ">
            APPLY4GRADUATION PROTECTING YOUR PRIVACY:
          </h2>

          <p class="c8"><span class="c4">Welcome to APPLY4GRADUATION Privacy Notice. The sub-titles links to will take you
            directly to each section where you will find information about how APPLY4GRADUATION manages the security of
            your privacy.&nbsp;</span></p>
          <p class="c8"><span class="c2">Introduction</span></p>
          <p class="c8"><span class="c9">APPLY4GRADUATION respects your right to privacy. This privacy notice explains who we
            are, how we collect, share and use personal information about you, and how you can exercise your privacy
            rights. This Privacy Notice applies to data collected about all users of&nbsp;</span><span class="c0"><a
              class="c11"
              href="https://www.google.com/url?q=http://www.apply4graduation.com&amp;sa=D&amp;source=editors&amp;ust=1652997232115594&amp;usg=AOvVaw1FgADGzYxpwPG3bpoy4tJS">www.apply4graduation.com</a></span><span
                class="c9">&nbsp;and websites of our subsidiary companies, and other related websites, (the
              &ldquo;</span><span class="c0"><a class="c11"
                href="https://www.google.com/url?q=http://www.applyuninow.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232115934&amp;usg=AOvVaw37UqpJqQBQ8loqCRHrTwFk">1</a></span><span
                  class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                    href="https://www.google.com/url?q=http://www.unifeatures.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232116180&amp;usg=AOvVaw0eRUVNUajxmJCNUYDqBq4Y">2</a></span><span
                      class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                        href="https://www.google.com/url?q=http://www.admitsconnect.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232116420&amp;usg=AOvVaw318KbLPIzj1W5Qi5EFflvO">3</a></span><span
                          class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                            href="https://www.google.com/url?q=http://www.internationalstudentvisas.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232116671&amp;usg=AOvVaw1bTRnNF3O_RbIHNh2XUbtE">4</a></span><span
                              class="c9">&rdquo;) and the services available on the Website (the &ldquo;</span><span class="c0"><a
                                class="c11"
                                href="https://www.google.com/url?q=http://www.applyuninow.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232116909&amp;usg=AOvVaw16WwTIqr3uB8XVg5xf63w0">1</a></span><span
                                  class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                                    href="https://www.google.com/url?q=http://www.unifeatures.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232117138&amp;usg=AOvVaw1sLiaxdD18pGmCmsEaTPxx">2</a></span><span
                                      class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                                        href="https://www.google.com/url?q=http://www.admitsconnect.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232117357&amp;usg=AOvVaw3tGOQdFUZOnaQdirDie-ni">3</a></span><span
                                          class="c9">&rdquo;&rdquo;</span><span class="c0"><a class="c11"
                                            href="https://www.google.com/url?q=http://www.internationalstudentvisas.com/&amp;sa=D&amp;source=editors&amp;ust=1652997232117592&amp;usg=AOvVaw1nt7giQHLMKE-zYD6ddXU9">4</a></span><span
                                              class="c4">&rdquo;).</span></p>
          <p class="c8"><span class="c4">The terms &ldquo;the Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
            &ldquo;our,&rdquo; and &ldquo;ours&rdquo; refer to APPLY4GRADUATION. The terms &ldquo;you,&rdquo;
            &ldquo;your,&rdquo; and &ldquo;yours&rdquo; refer to the user or viewer of the Website or user of the
            Services, as applicable.</span></p>
          <p class="c8"><span class="c4">APPLY4GRADUATION reserves the right to make changes periodically to this Privacy
            Notice at our sole discretion. Changes to the Privacy Notice will be posted on this page.</span></p>
          <p class="c8"><span class="c4">If you have any questions or concerns about our use of your personal information,
            please contact us using the contact details provided at the bottom of this Privacy Notice.</span></p>
          <p class="c8"><span class="c4">This Privacy Notice explains the categories of personal data we may collect about
            you, it also explains the purpose of processing your data and how we keep it safe.</span></p>
          <p class="c8"><span class="c4">We know that there&rsquo;s a lot of information here, but we want you to be informed
            about your rights, and how we use data across the APPLY4GRADUATION companies to provide you with the best
            possible service.</span></p>
          <p class="c8"><span class="c4">For your convenience we have split the information into manageable sections which we
            hope will answer any questions you have but if not, please do get in touch with us.</span></p>
          <p class="c8"><span class="c2">Who is APPLY4GRADUATION?</span></p>
          <p class="c8"><span class="c9 c15">APPLY4GRADUATION LIMITED </span><span class="c4">is a global education provider
            (12731878). Our head office is located in England, London. The Company has subsidiary companies and
            affiliated organisations operating in India and USA collectively called the &ldquo;Company&rdquo;.</span>
          </p>
          <p class="c8"><span class="c9">The following link will provide you with further details of the
            company:&nbsp;</span><span class="c0"><a class="c11"
              href="https://www.google.com/url?q=http://www.apply4graduation.com&amp;sa=D&amp;source=editors&amp;ust=1652997232118673&amp;usg=AOvVaw1_qDkJcGKWP07omXk87gLR">www.Apply4Graduation.com</a></span>
          </p>
          <p class="c8"><span class="c4">For ease of reading this notice the &ldquo;Company&rdquo; will be referred to as
            &ldquo;we&rdquo; and &ldquo;us&rdquo; in this notice.</span></p>
          <p class="c8"><span class="c2">Explaining the legal basis for processing your personal data</span></p>
          <p class="c8"><span class="c4">The Company is a global company and understands that the laws on data protection may
            be different in different countries, however, the Company has set out below a number of different reasons
            for which we may collect and process your personal data, including:</span></p>
          <p class="c8"><span class="c6">Consent</span></p>
          <ol class="c3 lst-kix_list_1-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">In specific situations, we can collect and process your data with
              your consent for example, when you tick a box to receive marketing material from us.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When collecting your personal data, we&rsquo;ll endeavour to collect
              the minimum necessary for us to provide our services.</span></li>
          </ol>
          <p class="c8"><span class="c6">Parental Consent</span></p>
          <ol class="c3 lst-kix_list_2-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c9">Depending upon national and sometimes state law you may be called a
              &ldquo;minor&rdquo; when it comes to signing a contract or consenting for us to collect and process your
              personal data. This means you have not reached the&nbsp;</span><span class="c7">legal age of
                consent</span><span class="c4">.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">In most of the countries, it is usual to require a person to be 18
              years of age to have reached the legal age of consent.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">In Europe it is usual that a person is 16 years of age, 13 in the
              U.K. to consent to receive marketing information. As part of protecting you and your rights, if the law
              says you are still a &ldquo;minor&rdquo;, we require your parents/guardians consent to directly collect
              and process your data via online services.</span></li>
          </ol>
          <p class="c8"><span class="c6">Explicit Consent</span></p>
          <ol class="c3 lst-kix_list_3-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c7">Explicit Consent</span><span class="c4">&nbsp;means that you have
              been presented with an option to agree or disagree with the collection, use, or disclosure of personal
              information.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c9">If we need to collect&nbsp;</span><span class="c7">special
              categories&nbsp;</span><span class="c9">of data from you in order to provide you with the services you
                require or meet our legal obligations, we will collect this data on the basis of your&nbsp;</span><span
                  class="c7">explicit consent</span><span class="c4">, national/regional social protection laws or for
                    statistical reporting purposes requested by official bodies.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">The special category data that we may request from you includes
              details such as your racial or ethnic origin and passport or birth certificate because they are
              necessary to satisfy enrolment or visa requirements. We may also need to collect data concerning your
              health (eg medical check reports and immunisation history) to provide additional support to you.</span>
            </li>
          </ol>
          <p class="c8"><span class="c6">Contractual obligations</span></p>
          <ol class="c3 lst-kix_list_4-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">In certain circumstances we will need to collect your personal data
              to meet our contractual obligations to you.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We will collect this data so that we can make an offer to you to
              study or enrol with us or to work with us.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We will use this data to establish a contract that sets out your
              obligations as a enrolling student or employee and our obligations as the provider of the study services
              or employment to you.</span></li>
          </ol>
          <p class="c8"><span class="c6">Legal compliance</span></p>
          <ol class="c3 lst-kix_list_5-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">If the law requires us to, we may need to collect and process your
              data for a number of reasons, for example to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_5-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Prevent fraud</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Meet the needs of immigration authorities</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Comply with Consumer Protection law</span></li>
          </ol>
          <p class="c8"><span class="c6">Legitimate interest</span></p>
          <ol class="c3 lst-kix_list_6-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">In specific situations, we collect your personal data as part of
              undertaking our legitimate interests in a way which might reasonably be expected as part of running our
              business and, which does not materially impact your rights, freedom or interests. It might
              include:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_6-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Staying in touch with you for purposes of staying in touch with
              enrolled / ex-students as part of an alumni programme</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Keeping you informed regarding Company highlights and news</span>
            </li>
          </ol>
          <p class="c8"><span class="c2">When do we collect your Personal Data?</span></p>
          <ol class="c3 lst-kix_list_7-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">When you visit any of our websites, (here we just collect
              transaction-based data).</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you complete our online or paper/PDF application forms.</span>
            </li>
            <li class="c1 li-bullet-0"><span class="c4">When you engage with us on social media.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you contact us by any means with queries, comments etc.</span>
            </li>
            <li class="c1 li-bullet-0"><span class="c4">When you book any kind of appointment with us.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you book to attend an event.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you&rsquo;ve given a third-party permission to share with us
              the information they hold about you.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you attend a college, campus or office, which may have CCTV
              systems operating for the security of both enrolled. / enrolling Students, Visitors and Staff. These
              systems may record your image during your visit.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">When you engage with our online learning tools such as Moodle, and
              attend our online delivery through tools such as Zoom.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">For employees we collect your personal data throughout the period of
              your employment with the Company</span></li>
          </ol>
          <p class="c8 c14"><span class="c2"></span></p>
          <p class="c8"><span class="c2">Categories of Personal Data we collect</span></p>
          <ol class="c3 lst-kix_list_8-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">Your contact details i.e. your:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Name</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Gender</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Date of birth</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Postal address (can be a postal box number and/or a street
              address)</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Social media contacts</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Telephone number/s (mobile and landline)</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-0" start="2">
            <li class="c1 li-bullet-0"><span class="c4">Identity and Immigration documentation i.e. your:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Passport</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Driver&#39;s licence</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Identity card</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Visa details</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-0" start="3">
            <li class="c1 li-bullet-0"><span class="c4">Your bank account details.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Your educational history inclusive of but not limited to
              your:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Current qualifications</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Grades</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Institution/s you studied at</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Most recent study experience</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-0" start="5">
            <li class="c1 li-bullet-0"><span class="c4">Details of your interactions with us, such as:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-1 start">
            <li class="c5 li-bullet-0"><span class="c4">We collect details of enquiries and comments you make in the web
              pages you visit or when you contact us by email, telephone or in person</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Information gathered by the use of &lsquo;cookies&rsquo; in your web
              browser. (Learn more about our &lsquo;Cookies policy&rsquo;</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-0" start="6">
            <li class="c1 li-bullet-0"><span class="c4">Additionally, for employment purposes:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_8-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Social security (or equivalent) details</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Next of Kin details</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Health information</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Your image, voice and written contributions</span></li>
            <li class="c5 li-bullet-0"><span class="c4">As you interact with our website and other platforms made available
              by the company, we may automatically collect technical data about your equipment, browsing actions and
              patterns.</span></li>
          </ol>
          <p class="c8"><span class="c2">Why we use your Personal Data?</span></p>
          <ol class="c3 lst-kix_list_9-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">To ensure that we provide you with the information and service you
              need we sometimes combine the data we have about you. This is allowed as part of our legitimate interest
              to provide you with the optimum service.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">If you wish to change how we use your data, you&rsquo;ll find
              details in the &lsquo;What are my rights?&rsquo; section below.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">If you choose not to share your personal data with us, or refuse
              certain contact permissions, we might not be able to provide some or all of the services you&rsquo;ve
              asked for. In this case we will contact you to confirm your request.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">The reasons we use your personal data include:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_9-1 start">
            <li class="c5 li-bullet-0"><span class="c9">To operate and administer our business to provide you with the best
              possible service. This is done on the basis of our&nbsp;</span><span class="c7">legitimate business
                interests</span><span class="c4">.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To respond to your queries and requests.&nbsp;</span></li>
            <li class="c5 li-bullet-0"><span class="c4">We may keep a record of communication with you. We do this on the
              basis of our contractual obligations to you, our legal obligations and our legitimate interests in
              providing you with the best service.&nbsp;</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To protect our business and you from fraud and other illegal
              activities.&nbsp;</span></li>
            <li class="c5 li-bullet-0"><span class="c9">We&rsquo;ll also monitor your browsing activity with us to quickly
              identify and resolve any problems and protect the integrity of our websites. We&rsquo;ll do all of this
              as part of our&nbsp;</span><span class="c7">legitimate interest</span><span class="c4">.&nbsp;</span>
            </li>
            <li class="c5 li-bullet-0"><span class="c9">To protect our enrolling students, visitors and staff, premises and
              assets, we operate CCTV systems in some of our colleges, campuses and offices which record images for
              security. We do this on the basis of our&nbsp;</span><span class="c7">legitimate business
                interests</span><span class="c4">.</span></li>
            <li class="c5 li-bullet-0"><span class="c9">To process payments and to prevent fraudulent transactions. This is
              done on the basis of our&nbsp;</span><span class="c7">legitimate business interests and to help protect
                you from fraud</span><span class="c4">.&nbsp;</span></li>
            <li class="c5 li-bullet-0"><span class="c4">With your consent, we will use your personal data preferences, to
              keep you informed by&nbsp;email, web, text, social media and telephone&nbsp;about relevant services and
              events.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To protect your vital interests if you become unable to provide
              consent.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To hire and manage employees and contractors. We do this as part of
              our contract with you.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To send you communications required by law or which are necessary to
              inform you about our changes to the services we provide you. (For example, updates to this Privacy
              Notice). These service messages will not include any marketing content and do not require prior consent
              when sent by email or text message. We need to keep you informed as part of complying with our legal
              obligations.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">To comply with our contractual or legal obligations to share data
              with law enforcement if necessary, for example:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_9-2 start">
            <li class="c8 c10 li-bullet-0"><span class="c4">If a court order is presented that requires us to share your
              personal data with law enforcement agencies or courts of law</span></li>
          </ol>
          <p class="c8"><span class="c2">How we look after your Personal Data</span></p>
          <ol class="c3 lst-kix_list_10-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We know how much data security matters. We will treat your data with
              the utmost care and respect and take all appropriate steps to protect it.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We secure access to all transactional areas of our websites and apps
              using &lsquo;https&rsquo; technology.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Access to your personal data is restricted and secure,&nbsp;and
              sensitive personal data such as health information is secured via password protection and
              encryption.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Storage systems for paper copies are secured and access is managed
              through the Company&rsquo;s access protocols.</span></li>
          </ol>
          <p class="c8"><span class="c2">How long do we keep your Personal Data?</span></p>
          <ol class="c3 lst-kix_list_11-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We have a detailed records management programme in place and all
              records (paper and electronic) are required to be managed in accord with its security and disposal
              steps.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Whenever we collect or process your personal data, we will store it
              safely and only for as long as is necessary for the original purpose for which it was collected or as
              required by law.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">At the end of the documented retention period, your data will either
              be deleted completely or anonymised.</span></li>
          </ol>
          <p class="c8"><span class="c2">Sharing your Personal Data</span></p>
          <p class="c8"><span class="c6">We share your Personal Data with trusted Third Parties</span></p>
          <ol class="c3 lst-kix_list_12-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We sometimes share your personal data with trusted third parties to
              provide services and business functions. An example of a third party would be a APPLY4GRADUATION
              contracted education agency in and/or a University Partner.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We set very clear directions and expectations for those
              organisations regarding the safety and protection of your privacy and personal data.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">The directions and expectations are set out in our contract with the
              third party and include:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_12-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Providing them only the information they need to perform their
              specific services</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Setting out the purpose for which the personal data is being
              shared</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Confirmation that they will make every reasonable effort to ensure
              that your privacy is respected and protected</span></li>
            <li class="c5 li-bullet-0"><span class="c4">If we stop using their services, they will undertake to either
              securely delete or render anonymous any of your personal data held by them</span></li>
            <li class="c5 li-bullet-0"><span class="c4">They will inform us immediately in the event of a suspected or
              actual breach being detected.</span></li>
          </ol>
          <p class="c8"><span class="c6">The types of third parties we work with include:</span></p>
          <ol class="c3 lst-kix_list_13-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">Educational Agents</span></li>
            <li class="c1 li-bullet-0"><span class="c4">IT companies supporting our websites</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Cloud storage companies</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Customer Relationship Management application providers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Educational establishments</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Educational professionals</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Regulatory authorities</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Accommodation providers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">General services</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Online webinar providers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Insurers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Financial service providers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Travel service providers</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Migration Agents</span></li>
          </ol>
          <p class="c8"><span class="c12">How do third party partners use your Personal Data?</span></p>
          <ol class="c3 lst-kix_list_14-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">When you use a service from one of our chosen partners, your data
              will be collected and used by them under the terms of their own separate privacy policies.</span></li>
          </ol>
          <p class="c8"><span class="c12">Why do we share your Personal Data?</span></p>
          <ol class="c3 lst-kix_list_15-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We need to share your personal data with trusted third parties in
              order to meet legal and regulatory obligations and fulfil our contractual promise to you.&nbsp;</span>
            </li>
            <li class="c1 li-bullet-0"><span class="c4">We will only share your data with third parties in very specific
              circumstances, for example:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_15-1 start">
            <li class="c5 li-bullet-0"><span class="c4">With your consent, given at the time you supplied your personal
              data, to us, we may pass that data to a third party for their direct marketing purposes.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">When working with academic professionals as part of ensuring the
              delivery of high quality services to you.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">We may share information about fraudulent or potentially fraudulent
              activity in our premises or systems. This may include sharing data about individuals with law
              enforcement bodies.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">If we receive a valid request from the police or other law
              enforcement agency, regulatory or Government authority in your country of origin or elsewhere, we may be
              required to disclose your personal data.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">We may, from time to time, expand, reduce or sell the Company and
              this may involve the transfer of business entities or the whole business to new owners. If this happens,
              your personal data will, where relevant, be transferred to the new owner or controlling party, under the
              terms of this Privacy Notice.</span></li>
          </ol>
          <p class="c8"><span class="c2">Processing and Transferring your Personal Data</span></p>
          <p class="c8"><span class="c6">Apply4Graduation &ndash; a global organisation</span></p>
          <ol class="c3 lst-kix_list_16-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We have operations in many different geographic regions and our head
              office is in England, UK - therefore, we will sometimes need to share your personal data across national
              boundaries and borders for Institutional application and admission purposes for example:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_16-1 start">
            <li class="c5 li-bullet-0"><span class="c4">outside the European Economic Area (EEA)</span></li>
            <li class="c5 li-bullet-0"><span class="c4">between North America and Australia</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Asia and Australia</span></li>
            <li class="c5 li-bullet-0"><span class="c4">New Zealand and Australia</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Canada and Australia</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Europe and Australia&nbsp;</span></li>
          </ol>
          <ol class="c3 lst-kix_list_16-0" start="2">
            <li class="c1 li-bullet-0"><span class="c4">The transfer of data, inclusive of personal data, may include
              transferring it to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_16-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Our head office or channel partners in England, UK.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Other Company businesses and elsewhere within the Company&rsquo;s
              global structure (intra-company transfers)</span></li>
          </ol>
          <ol class="c3 lst-kix_list_16-0" start="3">
            <li class="c1 li-bullet-0"><span class="c4">If we do transfer your personal data across an international border,
              we have procedures in place to ensure your data receives the same protection as if it were being
              processed inside your country of residence.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">For further information on the transfer of your personal data you
              can contact us.</span></li>
          </ol>
          <p class="c8"><span class="c2">Your rights over your Personal Data explained&nbsp;</span></p>
          <p class="c8"><span class="c6">Your personal rights</span></p>
          <ol class="c3 lst-kix_list_17-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">We need you to understand the rights you have when it comes to your
              personal information.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">Not all countries extend the same rights under their respective
              privacy regulation. The examples of rights available under privacy regulation noted below, show how
              those rights vary across the world and the many different nations in which the Company operates. We have
              set out a few of these below for your information.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">If your country is not listed below, please contact us&nbsp;for
              further information. In your email&nbsp;please set out the country and region within that country you
              are enquiring about, in order that we can provide you with the right information.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">The rights you have may be different depending on where you live in
              the world for instance, in the EU, EEA or the UK you have the right to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Access and review personal data we hold about</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Rectify/correct any inaccurate personal information we hold about
              you.</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Request a copy of data you supplied to us, in a machine readable
              format or for the transfer of this data to another company</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Request the restriction of processing of your personal data</span>
            </li>
            <li class="c5 li-bullet-0"><span class="c4">Object to us processing your personal data</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Request the erasure of your data, (right to be forgotten)</span>
            </li>
          </ol>
          <ol class="c3 lst-kix_list_17-0" start="5">
            <li class="c1 li-bullet-0"><span class="c4">For any of these EU/EEA/UK requests please contact us. </span></li>
            <li class="c1 li-bullet-0"><span class="c4">If you live in Australia you have the right to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Request anonymity and pseudonymity</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Request for information not to be used for marketing purposes</span>
            </li>
            <li class="c5 li-bullet-0"><span class="c4">Access and review personal data we hold about you</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Rectify/Correct any inaccurate personal information we hold about
              you</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-0" start="7">
            <li class="c1 li-bullet-0"><span class="c4">If you live in New Zealand or Canada you have the right to:</span>
            </li>
          </ol>
          <ol class="c3 lst-kix_list_17-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Access and review personal data we hold about you</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Rectify/Correct personal data we hold about you</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-0" start="8">
            <li class="c1 li-bullet-0"><span class="c4">If you live in the United States of America you have the right
              to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Access and review personal data we hold about you</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Rectify/Correct personal data we hold about you</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Be informed of any disclosures</span></li>
            <li class="c5 li-bullet-0"><span class="c4">Certain residents of US States may have additional privacy rights
              including certain California residents under the California Consumer Privacy Act (CCPA). Such rights
              include a right to:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-2 start">
            <li class="c8 c10 li-bullet-0"><span class="c4">Obtain information about personal data that we may collect,
              share or sell</span></li>
            <li class="c8 c10 li-bullet-0"><span class="c4">Request deletion of certain personal data we hold about
              you</span></li>
            <li class="c8 c10 li-bullet-0"><span class="c4">Opt-out from the sale of personal data relating to you</span>
            </li>
            <li class="c8 c10 li-bullet-0"><span class="c4">Not be discriminated against for the exercise of legal privacy
              rights</span></li>
          </ol>
          <ol class="c3 lst-kix_list_17-0" start="9">
            <li class="c1 li-bullet-0"><span class="c9">For any privacy rights in regions/countries/states&nbsp;outside of
              Europe</span><span class="c6">&nbsp;</span><span class="c4">please contact us. </span></li>
            <li class="c1 li-bullet-0"><span class="c4">For an explanation of your rights in the country in which you live,
              work or study with one of our business entities please contact us. Set out the nature of your request
              and the Company will inform you of how it is able to assist you. Please note that the same rights do not
              apply in all of our operating regions, countries or states.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">All requests related to your rights and your personal data, will be
              examined in detail and a member of the Privacy team will respond to you as quickly as possible.</span>
            </li>
            <li class="c1 li-bullet-0"><span class="c4">We will make all reasonable efforts to meet with your request and
              will keep you informed as to our progress in getting the information to you in a format that is
              acceptable and usable.</span></li>
          </ol>
          <p class="c8"><span class="c2">Withdrawal of consent</span></p>
          <ol class="c3 lst-kix_list_18-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">Whenever you have given us your consent to use your personal data,
              you have the right to change your mind at any time and withdraw that consent.</span></li>
          </ol>
          <p class="c8"><span class="c2">Legitimate interest</span></p>
          <ol class="c3 lst-kix_list_19-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">In cases where we are processing your personal data on the basis of
              our legitimate interest, you can ask us to stop for reasons connected to your individual
              situation.</span></li>
          </ol>
          <p class="c8"><span class="c2">Marketing</span></p>
          <ol class="c3 lst-kix_list_20-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">You have the right to stop the use of your personal data for
              marketing activity through all channels, or selected channels.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We will always comply with your request. To action this:</span></li>
          </ol>
          <ol class="c3 lst-kix_list_20-1 start">
            <li class="c5 li-bullet-0"><span class="c4">Click the &lsquo;unsubscribe&rsquo; link in any email communication
              that we send you&nbsp;</span></li>
            <li class="c5 li-bullet-0"><span class="c4">We will then stop any further emails from being sent to you</span>
            </li>
          </ol>
          <ol class="c3 lst-kix_list_20-0" start="3">
            <li class="c1 li-bullet-0"><span class="c4">Please note that you may continue to receive communications for a
              short period after changing your preferences while our systems are fully updated.</span></li>
          </ol>
          <p class="c8"><span class="c2">Questions or Issues you may have</span></p>
          <ol class="c3 lst-kix_list_21-0 start" start="1">
            <li class="c1 li-bullet-0"><span class="c4">If you require any further information we will be pleased to provide
              you with further detail.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">If you are contacting us to complain about an alleged breach of this
              Privacy Notice or our legal privacy obligations, please provide us with as much detail as possible in
              relation to your complaint so that we can deal with your concern quickly and effectively.</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We will take every privacy complaint seriously and assess it with
              the aim of resolving all issues quickly and efficiently.&nbsp;</span></li>
            <li class="c1 li-bullet-0"><span class="c4">We&rsquo;d be grateful for your cooperation with us during this
              process by providing us with any relevant information that we may need.</span></li>
          </ol>
          <p class="c8 c14"><span class="c4"></span></p>

        </div>
      </div>
      <div className="mt-4 ml-5">
        <input
          onClick={handleClick}
          className="relative top-1"
          type="checkbox"
        ></input>
        <label className=" font-semibold pl-3 text-sm lg:text-base">
          I Accept the terms and conditions.
        </label>
      </div>
      <div className="flex justify-center gap-5 pr-5 mt-5 lg:justify-end">
        {
          loading ? <button
            disabled={true}
            className={`submit text-[#000000] px-5 py-2 rounded-lg font-medium `}

          >
            Loading...
          </button> : <button
            disabled={!done}
            className={`submit text-[#000000] px-5 py-2 rounded-lg font-medium `}
            onClick={handleClickDone}
          >
            Accept
          </button>
        }

      </div>
    </div>
  );
};
