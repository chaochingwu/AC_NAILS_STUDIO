'use strict';
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
function menu(open){toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'關閉選單':'開啟選單');nav.classList.toggle('open',open);}
toggle.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
nav.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){menu(false);toggle.focus()}});
matchMedia('(max-width:820px)').addEventListener('change',()=>menu(false));
document.querySelectorAll('.top').forEach(b=>b.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})));
const viewer=document.querySelector('#viewer');
if(viewer){const items=[...document.querySelectorAll('.gallery-item')],large=document.querySelector('#viewer-img'),count=document.querySelector('#viewer-count');let active=0,origin=null,touchX=null;
function render(index){active=(index+items.length)%items.length;const img=items[active].querySelector('img');large.src=img.getAttribute('src');large.alt=img.alt;count.textContent=`${active+1} / ${items.length}`;}
items.forEach((b,i)=>b.addEventListener('click',()=>{origin=b;render(i);viewer.showModal();document.body.style.overflow='hidden';document.querySelector('#viewer-close').focus()}));
document.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());document.querySelector('#viewer-prev').addEventListener('click',()=>render(active-1));document.querySelector('#viewer-next').addEventListener('click',()=>render(active+1));
viewer.addEventListener('close',()=>{document.body.style.overflow='';origin?.focus()});viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();render(active-1)}if(e.key==='ArrowRight'){e.preventDefault();render(active+1)}});viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});
large.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});large.addEventListener('touchend',e=>{if(touchX!==null){const diff=e.changedTouches[0].clientX-touchX;if(Math.abs(diff)>45)render(active+(diff<0?1:-1));touchX=null}},{passive:true});}
