import React, {Component,useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import SlingButton from './components/SlingButton';
import ElectricLogo from './components/ElectricLogo';
import HoldButton from './components/HoldButton';
import GradientASCII from './components/GradientASCII';
import StarBorder from './components/StarBorder';

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
function Scene(){const {dark,active}=useScene();useEffect(()=>{const host=document.querySelector('#logoEffect');host.parentElement.dataset.logoReady='false';const root=createRoot(host);if(active&&window.innerWidth>=600)root.render(<SafeEffect><ElectricLogo src={mark} onRender={()=>{if(host.parentElement.dataset.logoReady!=='true')host.parentElement.dataset.logoReady='true'}} color={dark?'#b6deff':'#1262de'} glowColor="#4b8aff" scale={0.62} speed={0.65} strands={2} arcs={0} flicker={0.1} bend={0.18} crackle={0.4} intensity={0.8} interactive={false} theme={dark?'dark':'light'}/></SafeEffect>);return()=>{host.parentElement.dataset.logoReady='false';root.unmount()}},[dark,active]);return active?<SafeEffect><GradientASCII colors={['#2868e8','#a5d8ff','#f8c77c']} shape="horizon" cellSize={24} density={0.4} glyphOpacity={0.3} gradientOpacity={0.28} glow={0.08} flicker={0.04} flow={0.16} speed={0.18} grain={0} mouseInteraction={false} clickEffect="none" intro={false} lightMode={!dark} dpr={1}/></SafeEffect>:null}
const sceneHost=document.querySelector('#sceneEffect');if(sceneHost)createRoot(sceneHost).render(<Scene/>);
const holdHost=document.querySelector('#holdDelete');if(holdHost)createRoot(holdHost).render(<SafeEffect><HoldButton holdTime={1500} fillColor="#1262de" backgroundColor="#24354f" textColor="#ffffff" doneLabel="Deleted" waveAmplitude={3} onHold={()=>document.querySelector('#confirmDeleteDraft')?.click()} onTap={()=>document.querySelector('#confirmDeleteDraft')?.focus()}>Hold to delete saved copy</HoldButton></SafeEffect>);
let shareRoot=null,shareHost=null;
function mountShare(){const next=document.querySelector('#slingShare');if(next===shareHost)return;if(shareRoot)shareRoot.unmount();shareRoot=null;shareHost=next;if(!next)return;shareRoot=createRoot(next);shareRoot.render(<SafeEffect><SlingButton ariaLabel="Share settlement summary" size={48} padColor="#1262de" iconColor="#ffffff" accentColor="#4b8aff" wellColor="#cadbf3" bandColor="#6e94cb" particles={5} flight={45} spread={35} maxPull={70} armAt={25} launchSpeed={1200} axis="horizontal" tapSends onSend={()=>window.splitmindShareSummary?.()}/><span className="share-label">Share summary</span></SafeEffect>)}
const out=document.querySelector('#out');if(out){new MutationObserver(mountShare).observe(out,{childList:true});mountShare()}

// Add decoration to existing native buttons; clicks, keyboard behavior and labels stay native.
const buttonEffects=new Map();
function updateButtonEffects(){
 const enabled=document.documentElement.dataset.effects==='on'&&!document.hidden;
 const targets=enabled?Array.from(document.querySelectorAll('#groupNext,#manualStart,#confirm')):[];
 for(const [button,root] of buttonEffects){if(!button.isConnected||!targets.includes(button)){root.unmount();button.querySelector('.star-effect-host')?.remove();buttonEffects.delete(button)}}
 for(const button of targets){if(buttonEffects.has(button))continue;const host=document.createElement('span');host.className='star-effect-host';host.setAttribute('aria-hidden','true');button.appendChild(host);const root=createRoot(host);buttonEffects.set(button,root);root.render(<SafeEffect><StarBorder as="span" color="#a9d4ff" trailColor="#5a9cff" duration={8} thickness={1} radius={12} trailLength={0.18} glow={0.18} hover="none" clickPulse={false} backgroundColor="transparent" borderColor="transparent" /></SafeEffect>)}
}
let effectFrame=0;const scheduleButtonEffects=()=>{if(!effectFrame)effectFrame=requestAnimationFrame(()=>{effectFrame=0;updateButtonEffects()})};
const effectsObserver=new MutationObserver(scheduleButtonEffects);effectsObserver.observe(document.querySelector('#demo'),{childList:true,subtree:true});effectsObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-effects']});document.addEventListener('visibilitychange',scheduleButtonEffects);scheduleButtonEffects();
