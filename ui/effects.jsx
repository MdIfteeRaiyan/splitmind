import React, {Component,useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import HoldButton from './components/HoldButton';
import GradientASCII from './components/GradientASCII';

class SafeEffect extends Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed?null:this.props.children}
}
function appearance(){return document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches)}
function useScene(){
  const [dark,setDark]=useState(appearance),[visible,setVisible]=useState(!document.hidden);
  const [reduced,setReduced]=useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [enabled,setEnabled]=useState(()=>{try{return localStorage.getItem('splitmind.effects')!=='off'}catch{return true}});
  useEffect(()=>{const theme=new MutationObserver(()=>setDark(appearance()));theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});const media=matchMedia('(prefers-color-scheme: dark)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setDark(appearance()),motion=()=>setReduced(reduce.matches),visibility=()=>setVisible(!document.hidden);media.addEventListener('change',update);reduce.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);const button=document.querySelector('#fxToggle');const toggle=()=>setEnabled(value=>{try{localStorage.setItem('splitmind.effects',value?'off':'on')}catch{}return !value});button?.addEventListener('click',toggle);return()=>{theme.disconnect();media.removeEventListener('change',update);reduce.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility);button?.removeEventListener('click',toggle)}},[]);
  useEffect(()=>{const button=document.querySelector('#fxToggle');if(button){button.textContent=enabled?'Effects on':'Effects off';button.setAttribute('aria-pressed',String(enabled));}document.documentElement.dataset.effects=enabled&&!reduced?'on':'off'},[enabled,reduced]);
  return {dark,active:enabled&&!reduced&&visible};
}
function Scene(){const {dark,active}=useScene();return active?<SafeEffect><GradientASCII colors={['#2868e8','#a5d8ff','#f8c77c']} shape="horizon" cellSize={24} density={0.4} glyphOpacity={0.3} gradientOpacity={0.28} glow={0.08} flicker={0.04} flow={0.16} speed={0.18} grain={0} mouseInteraction={false} clickEffect="none" intro={false} lightMode={!dark} dpr={1}/></SafeEffect>:null}
const sceneHost=document.querySelector('#sceneEffect');if(sceneHost)createRoot(sceneHost).render(<Scene/>);
const holdHost=document.querySelector('#holdDelete');if(holdHost)createRoot(holdHost).render(<SafeEffect><HoldButton holdTime={1500} fillColor="#1262de" backgroundColor="#24354f" textColor="#ffffff" doneLabel="Deleted" waveAmplitude={3} onHold={()=>document.querySelector('#confirmDeleteDraft')?.click()} onTap={()=>document.querySelector('#confirmDeleteDraft')?.focus()}>Hold to delete saved copy</HoldButton></SafeEffect>);
