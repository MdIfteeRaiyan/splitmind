import React, {Component,useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import SlingButton from './components/SlingButton';
import ElectricLogo from './components/ElectricLogo';
import HoldButton from './components/HoldButton';
import SideRays from './components/SideRays';

class SafeEffect extends Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed?null:this.props.children}
}
const mark='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="88" font-weight="900" fill="white">S</text></svg>');
function appearance(){return document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches)}
function useScene(){
  const [dark,setDark]=useState(appearance),[visible,setVisible]=useState(!document.hidden);
  const [reduced,setReduced]=useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [enabled,setEnabled]=useState(()=>{try{return localStorage.getItem('splitmind.effects')!=='off'}catch{return true}});
  useEffect(()=>{const theme=new MutationObserver(()=>setDark(appearance()));theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});const media=matchMedia('(prefers-color-scheme: dark)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setDark(appearance()),motion=()=>setReduced(reduce.matches),visibility=()=>setVisible(!document.hidden);media.addEventListener('change',update);reduce.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);const button=document.querySelector('#fxToggle');const toggle=()=>setEnabled(value=>{try{localStorage.setItem('splitmind.effects',value?'off':'on')}catch{}return !value});button?.addEventListener('click',toggle);return()=>{theme.disconnect();media.removeEventListener('change',update);reduce.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility);button?.removeEventListener('click',toggle)}},[]);
  useEffect(()=>{const button=document.querySelector('#fxToggle');if(button){button.textContent=enabled?'Effects on':'Effects off';button.setAttribute('aria-pressed',String(enabled));}document.documentElement.dataset.effects=enabled&&!reduced?'on':'off'},[enabled,reduced]);
  return {dark,active:enabled&&!reduced&&visible};
}
function Scene(){const {dark,active}=useScene();useEffect(()=>{const host=document.querySelector('#logoEffect');host.parentElement.dataset.logoReady='false';const root=createRoot(host);if(active&&window.innerWidth>=600)root.render(<SafeEffect><ElectricLogo src={mark} onRender={()=>{if(host.parentElement.dataset.logoReady!=='true')host.parentElement.dataset.logoReady='true'}} color={dark?'#b6deff':'#1262de'} glowColor="#4b8aff" scale={0.62} speed={0.65} strands={2} arcs={0} flicker={0.1} bend={0.18} crackle={0.4} intensity={0.8} interactive={false} theme={dark?'dark':'light'}/></SafeEffect>);return()=>{host.parentElement.dataset.logoReady='false';root.unmount()}},[dark,active]);return active?<SafeEffect><SideRays rayColor1="#FFC46B" rayColor2="#96c8ff" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} sharpness={0.5} glow={1} dust={0} opacity={1} followMouse mouseInfluence={0.25} intro={false} lightMode={!dark} maxDevicePixelRatio={1}/></SafeEffect>:null}
const sceneHost=document.querySelector('#sceneEffect');if(sceneHost)createRoot(sceneHost).render(<Scene/>);
const holdHost=document.querySelector('#holdDelete');if(holdHost)createRoot(holdHost).render(<SafeEffect><HoldButton holdTime={1500} fillColor="#1262de" backgroundColor="#24354f" textColor="#ffffff" doneLabel="Deleted" waveAmplitude={3} onHold={()=>document.querySelector('#confirmDeleteDraft')?.click()} onTap={()=>document.querySelector('#confirmDeleteDraft')?.focus()}>Hold to delete saved copy</HoldButton></SafeEffect>);
let shareRoot=null,shareHost=null;
function mountShare(){const next=document.querySelector('#slingShare');if(next===shareHost)return;if(shareRoot)shareRoot.unmount();shareRoot=null;shareHost=next;if(!next)return;shareRoot=createRoot(next);shareRoot.render(<SafeEffect><SlingButton ariaLabel="Share settlement summary" size={48} padColor="#1262de" iconColor="#ffffff" accentColor="#4b8aff" wellColor="#cadbf3" bandColor="#6e94cb" particles={5} flight={45} spread={35} maxPull={70} armAt={25} launchSpeed={1200} axis="horizontal" tapSends onSend={()=>window.splitmindShareSummary?.()}/><span className="share-label">Share summary</span></SafeEffect>)}
const out=document.querySelector('#out');if(out){new MutationObserver(mountShare).observe(out,{childList:true});mountShare()}
