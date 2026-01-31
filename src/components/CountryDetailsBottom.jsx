import "../styles/countrydetails.css"
import downArrow from "../Images/downArrow.svg"
import upArrow from "../Images/upArrow.svg"
import React from "react"

export const CountryDetailsBottom = ({ content }) => {
    const { about, study, visa, work } = content ? content : {}
    const Switch = props => {
        const { test, children } = props
        // filter out only children with a matching prop
        return children.find(child => {
            return child.props.value === test
        })
    }
    const [activeTab, setActiveTab] = React.useState('1');
    return (
        <>
            <div className="relative z-10 w-full h-full bg-white ">
                <div className="container pb-40 m-auto">
                    <div className="w-[calc(100%-140px)] m-auto relative z-10 flex justify-start pt-12 pb-4 space-x-8 text-lg text-darkblue audio mobileViews">
                        <p className={"px-4 bg-bglightblue lg:bg-white cursor-pointer" + (activeTab == '1' ? ' active' : '')} onClick={() => setActiveTab('1')}>About</p>
                        <p className={"px-4 bg-bglightblue lg:bg-white cursor-pointer" + (activeTab == '2' ? ' active' : '')} onClick={() => setActiveTab('2')}>Study</p>
                        <p className={"px-4 bg-bglightblue lg:bg-white cursor-pointer" + (activeTab == '3' ? ' active' : '')} onClick={() => setActiveTab('3')}>Work</p>
                        <p className={"px-4 bg-bglightblue lg:bg-white cursor-pointer" + (activeTab == '4' ? ' active' : '')} onClick={() => setActiveTab('4')}>Visa</p>
                    </div>
                    <div className="grid  px-4 my-12 grid-flow-row gap-2 max-w-[640px] mx-auto text-darkblue  lg:hidden">

                        <div className="border border-gray">
                            <div onClick={() => setActiveTab('1')} className="flex items-center justify-between px-4 py-2 bg-bglightblue">
                                <p className={"audio " + (activeTab == '1' ? ' text-slider' : 'text-darkblue')}>About</p>
                                <img className="pr-4" src={activeTab == '1' ? upArrow : downArrow} alt="arrow" />
                            </div>
                            <div className={"w-full pb-12 m-auto lg:bg-bglightblue " + (activeTab == '1' ? 'block' : 'hidden')}>
                                <div className="px-4 pt-6">
                                    <h1 className="py-4 text-base text-darkblue audio">COST OF STUDYING IN GERMANY</h1>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray">
                            <div onClick={() => setActiveTab('2')} className="flex items-center justify-between px-4 py-2 bg-bglightblue">
                                <p className={"audio " + (activeTab == '2' ? ' text-slider' : 'text-darkblue')}>Study</p>
                                <img className="pr-4" src={activeTab == '2' ? upArrow : downArrow} alt="arrow" />
                            </div>
                            <div className={"w-full pb-12 m-auto lg:bg-bglightblue " + (activeTab == '2' ? 'block' : 'hidden')}>
                                <div className="px-4 pt-6">
                                    <h1 className="py-4 text-base text-darkblue audio">COST OF STUDYING IN GERMANY</h1>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray">
                            <div onClick={() => setActiveTab('3')} className="flex items-center justify-between px-4 py-2 bg-bglightblue">
                                <p className={"audio " + (activeTab == '3' ? ' text-slider' : 'text-darkblue')}> Visa</p>
                                <img className="pr-4" src={activeTab == '3' ? upArrow : downArrow} alt="arrow" />
                            </div>
                            <div className={"w-full pb-12 m-auto lg:bg-bglightblue " + (activeTab == '3' ? 'block' : 'hidden')}>
                                <div className="px-4 pt-6">
                                    <h1 className="py-4 text-base text-darkblue audio">COST OF STUDYING IN GERMANY</h1>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray">
                            <div onClick={() => setActiveTab('4')} className="flex items-center justify-between px-4 py-2 bg-bglightblue">
                                <p className={"audio" + (activeTab == '4' ? ' text-slider' : 'text-darkblue')}>Work </p>
                                <img className="pr-4" src={activeTab == '4' ? upArrow : downArrow} alt="arrow" />
                            </div>
                            <div className={"w-full pb-12 m-auto lg:bg-bglightblue " + (activeTab == '4' ? 'block' : 'hidden')}>
                                <div className="px-4 pt-6">
                                    <h1 className="py-4 text-base text-darkblue audio">COST OF STUDYING IN GERMANY</h1>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                    <p className="pb-8 text-sm font-normal leading-loose text-darkblue">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting .</p>
                                </div>
                            </div>
                        </div>



                        {/* <p>How to Apply</p> */}

                        {/* <CountryDetailsAccordian /> */}
                    </div>
                    <div className="relative z-10 w-[calc(100%-140px)] m-auto lg:bg-bglightblue mobileViews pb-12">
                        <div className="px-20 pt-6">
                            <h1 className="py-8 text-2xl text-darkblue audio">{about}</h1>
                            {/* <p className="pb-8 text-base font-normal leading-loose text-darkblue">{about['paragraph1']}</p> */}
                            {/* <p className="pb-8 text-base font-normal leading-loose text-darkblue">{about['paragraph2']}</p> */}
                        </div>
                    </div>
                    {/* <div value={'2'} className="relative z-10 w-[calc(100%-140px)] m-auto lg:bg-bglightblue mobileViews pb-12">
                            <div className="px-20 pt-6">
                                <h1 className="py-8 text-2xl text-darkblue audio">{study['title']}</h1>
                                <p className="pb-8 text-base font-normal leading-loose text-darkblue">{study['paragraph1']}</p>
                                <p className="pb-8 text-base font-normal leading-loose text-darkblue">{study['paragraph2']}</p>
                            </div>
                        </div> */}

                </div>
            </div>
            <div className="relative z-10 hidden h-32 sm:block sm:bg-darkblue"></div>
        </>
    )
}