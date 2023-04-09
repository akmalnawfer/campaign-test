"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { leadsArr } from "./const";
import Loader from "@/components/Loader";

export type TLead = {
  fullName: string;
  whyMatched: Array<string>;
  emailPersonalization: string;
  conduit: string;
  aboutLead: string;
  education: string;
  title: string;
  address: string;
  topSkills: Array<string>;
  languages: Array<string>;
  company: string;
  comment: string;
}

export default function Home(): JSX.Element {

  // states
  const [count, setCount] = useState<number>(0);
  const [lead, setLead] = useState<TLead>(leadsArr[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentValid, setIsCommentValid] = useState(true);
  const [comment, setComment] = useState<string | undefined>(undefined);

  // ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    setLead(leadsArr[count]);
  }, [count]);

  // cancel lead
  const onCancel = () => {
    updateComment();
  }

  // approve lead
  const onApprove = () => {
    updateComment();
  }

  const updateComment = () => {
    if (comment && comment.length > 0) {
      setIsLoading(true);
      setIsCommentValid(true);
      setTimeout(() => {
        // will only update the current state, changing states will reset the object
        setLead({ ...lead, comment: comment });
        setIsLoading(false);
        setComment(undefined);
        // reset textarea
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }
        // goto next onject
        setCount(count + 1);
      }, 1000);
    } else {
      setIsCommentValid(false);
    }
  }

  if (!lead) 
  return (<CampaignDone>
    <div className="reached-end bg-white">
      <h2 className="text-black text-5xl font-bold mb-5">You&apos;re all done!</h2>
      <p className="text-black text-xl font-semibold">We&apos;ll get the campaign started and let you know how it&apos;s progressing.</p>
        <button className="rounded-full p-2 w-2/12 uppercase mr-3 bg-zinc-700 mt-5" onClick={()=> {setCount(0)}}>Refresh</button>
    </div>
  </CampaignDone>)

  return (
    <PageWrapper>
      {/* header */}
      <header className="bg-white border border-b-gray-300">
        <nav className="mx-auto flex max-w-4xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <div className="image-wrapper mr-3">
              <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <div className="title-wrapper">
              <h1 className="text-lg text-black">{lead.fullName}</h1>
              <p className="text-gray-500 text-sm font-semibold">{lead.title} <span className="font-light">at</span> {lead.company} <span className="font-light">Based in {lead.address}</span></p>
            </div>
          </div>
        </nav>

      </header>
      {/* content */}
      {isLoading && <Loader/>}
      <div className="page-content bg-white">
        <div className="mx-auto max-w-4xl p-6 lg:px-8">

          {/* reorganized email personalization line to get emphasize on why he/she is a lead */}
          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">email personalization line</h2>
            <div className="custom-email bg-slate-50 p-3">
              <p className="text-black text-sm">{lead.emailPersonalization}</p>
            </div>
          </div>
          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">why we matched you</h2>
            <ul>
              {lead.whyMatched.map((t, i) => (
                <li className="text-gray-500 text-sm" key={String(i)}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">about conduit</h2>
            <p className="text-gray-500 text-sm">{lead.conduit}</p>
          </div>

          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">about {lead.fullName}</h2>
            <p className="text-gray-500 text-sm">{lead.aboutLead}</p>
          </div>

          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">education</h2>
            <p className="text-gray-500 text-sm">{lead.education}</p>
          </div>

          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">top skills</h2>
            {lead.topSkills.map((skill, i) => (
              <span key={String(i)} className="text-sm leading-6 text-slate-800 md:order-first md:rounded-full p-2 md:text-xs md:font-semibold md:leading-7 md:bg-lime-200 md:text-slate-500 md:group-hover:bg-slate-200 mr-1">{skill}</span>
            ))}
          </div>

          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">languages</h2>
            {lead.languages.map((l, i) => (
              <span key={String(i)} className="text-sm leading-6 text-slate-600 md:order-first md:rounded-full p-2 md:text-xs md:font-semibold md:leading-7 md:bg-slate-100 md:text-slate-500 md:group-hover:bg-slate-200 mr-1">{l}</span>
            ))}
          </div>

          <div className="line mb-5">
            <h2 className="text-base text-black mb-2 uppercase">leave a comment on this lead</h2>
            <p className="text-gray-500 text-sm mb-2">Want to give feedback on this lead? Now&apos;s your chance! Specific details really helps us.</p>
            <textarea ref={textareaRef} className="w-full border border-gray-300 rounded text-black p-1" 
              onChange={(e) => {
                setComment(e.target.value)
              }} 
            />
            {!isCommentValid && <p className="text-orange-700 text-sm my-1">Invalid comment!</p>}
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-white border border-t-gray-300">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            {/* orged approve on right side for UX as default forward buttons are in right */}
            <button disabled={isLoading} className={`rounded-full p-2 w-6/12 uppercase mr-3 ${isLoading? 'bg-slate-200':' bg-red-400'}`} onClick={onCancel}>Cancel</button>
            <button disabled={isLoading} className={`rounded-full p-2 w-6/12 uppercase mr-3 ${isLoading? 'bg-slate-200':'bg-black'}`} onClick={onApprove}>Approve</button>
          </div>
        </div>
      </footer>
    </PageWrapper>
  )
}


const PageWrapper = styled.div`
  min-height: 100vh;
  .page-content{
    height: calc(100vh - 188px);
    overflow-y: auto;
  }
`;

const CampaignDone = styled.div`
  height: 100vh;
  .reached-end{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`