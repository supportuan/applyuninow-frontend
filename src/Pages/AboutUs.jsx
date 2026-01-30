import { Header } from "../components/Header";
import "../App.css";
import Particles from "react-tsparticles";

 const AboutUs = () => {
    const options = {
        particles: {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 700
                }
            },

            "color": {
                "value": "#b9cdf0"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#b9cdf0"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 0.1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 10,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#b9cdf0",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            },
        }
    }

    return (

        <div className="App bg-lightWhite">
            <Particles params={options} />
            <Header />

            <section className="about-us-section">
                <div className="container">
                    <div className="content-heading px-4 md:px-0">
                        <h4>About Us</h4>
                        <p>Confidence, like art, never comes from having all the answers it comes </p>
                        <p>from being open to all the questions.</p>
                    </div>
                    <div className="content-section p-4 md:p-8 mb-6">
                        <p>Apply4Gradutaion is Established and Headquartered in London, United Kingdom (12731878) and having support and operational branches in South India (Hyderabad &amp; Bangalore / Bengaluru). We are certified by the British Counsel in the capacity of Counsellor (2020/AS/8485) in the field of International Education Services.
                        </p>
                        <h4>Who we are?</h4>
                        <p>Apply4Graduation is a pioneer in the field of &#39;GLOBAL EDUCATION&#39; has brought the concept of overseas education to the digital and having all processes (end-end) in a single piece of screen of every student who is seeking assistance to study overseas. Our excellent digital applications, qualified counsellors and associations with leading institutions globally and impeccable reputation helps us to deliver top quality education services.
                        </p>
                        <h4>Vision:</h4>
                        <p>To be the World&#39;s Leading Overseas Education Consultants at guiding students to achieve their full potential and also assisting the Universities / Institutions with complete admission and compliance cycles.
                        </p>
                        <h4>Mission:</h4>
                        <p>Apply4Graduation offers unbiased, comprehensive, genuine, ethical and quality professional education services. We help connect students with institutions of higher learning globally. As a preferred partner for top global educational institutions, we attract the best talent in terms of counsellors and facilitators without distinction of race, religion or social status and offer a great working environment. We upskill the lives of students while preparing them to be globally successful citizens.
                            Apply4Graduation (www.Apply4graduation.com, www.ApplyUniNow.com, www.UniFeatures.com,
                            www.AdmitsConnect.com, www.InternationalStudentVisas.com) is one of the leading education consultants worldwide and is a pioneer in the field of abroad education. We provide professional consulting services to students in India, UK who like to pursue further education in other countries like USA, UK, Germany, Australia, Canada, France, Ireland, New Zealand, Switzerland and other European country . Our excellent global network with the Institutions helps us to deliver our best, genuine and factual services to our clients - applicants (students). We provide universities, colleges,
                            vocational institutions and schools in accordance with the requirements and qualifying match.
                            Given our strong ethical approach to business, we have built an excellent profile and credibility within the education industry. We have highly professional and trained staff; we provide a wide range of services to our clients - applicants (students) and institutional partners. Apply4Graduation (www.Apply4graduation.com, www.ApplyUniNow.com, www.UniFeatures.com, www.AdmitsConnect.com, www.InternationalStudentVisas.com) main aim is to recruit international students for quality educational institutions worldwide by providing a professional service to
                            prospective students in selecting the most appropriate course and institution for career betterment. Having the best consulting team with their prior knowledge in working with foreign universities and also the requirements of our clients - applicants (students), can correlate and give proper advice on the exact location and course to be taken up. Being a total solution based and a flawless educational consultant, Alfa Beta can surely show you a right way  to a bright future. We have a reputation of being the best educational consultant.  Our counsellors have been trained by international experts to guide students professionally in selecting the right course at the ideal university. Apply4Graduation (www.Apply4graduation.com, www.ApplyUniNow.com, www.UniFeatures.com, www.AdmitsConnect.com,
                            www.InternationalStudentVisas.com) counsellors are trained in counselling students for multiple
                            destinations and at all levels of education.</p>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default AboutUs