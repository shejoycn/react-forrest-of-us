(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{215:function(e,a,t){"use strict";t.r(a);var s=t(0),r=t.n(s),c=t(14),l=t(15),n=t(2),o=t.n(n),i=t(17);a.default=function(){const e=Object(s.useContext)(c.a),[a,t]=Object(l.a)({searchTerm:"",results:[],show:"neither",requestCount:0});function n(a){27==a.keyCode&&e({type:"closeSearch"})}return Object(s.useEffect)(()=>(document.addEventListener("keyup",n),()=>document.removeEventListener("keyup",n)),[]),Object(s.useEffect)(()=>{if(a.searchTerm.trim()){t(e=>{e.show="loading"});const e=setTimeout(()=>{t(e=>{e.requestCount++})},750);return()=>clearTimeout(e)}t(e=>{e.show="neither"})},[a.searchTerm]),Object(s.useEffect)(()=>{if(a.requestCount){const e=o.a.CancelToken.source();return async function(){try{const s=await o.a.post("/search",{searchTerm:a.searchTerm},{cancelToken:e.token});t(e=>{e.results=s.data,e.show="results"})}catch(e){console.log("There was a problem or the request was cancelled.")}}(),()=>e.cancel()}},[a.requestCount]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"search-overlay-top shadow-sm"},r.a.createElement("div",{className:"container container--narrow"},r.a.createElement("label",{htmlFor:"live-search-field",className:"search-overlay-icon"},r.a.createElement("i",{className:"fas fa-search"})),r.a.createElement("input",{onChange:function(e){const a=e.target.value;t(e=>{e.searchTerm=a})},autoFocus:!0,type:"text",autoComplete:"off",id:"live-search-field",className:"live-search-field",placeholder:"What are you interested in?"}),r.a.createElement("span",{onClick:()=>e({type:"closeSearch"}),className:"close-live-search"},r.a.createElement("i",{className:"fas fa-times-circle"})))),r.a.createElement("div",{className:"search-overlay-bottom"},r.a.createElement("div",{className:"container container--narrow py-3"},r.a.createElement("div",{className:"circle-loader "+("loading"==a.show?"circle-loader--visible":"")}),r.a.createElement("div",{className:"live-search-results "+("results"==a.show?"live-search-results--visible":"")},Boolean(a.results.length)&&r.a.createElement("div",{className:"list-group shadow-sm"},r.a.createElement("div",{className:"list-group-item active"},r.a.createElement("strong",null,"Search Results")," (",a.results.length," ",a.results.length>1?"items":"item"," found)"),a.results.map(a=>r.a.createElement(i.a,{post:a,key:a._id,onClick:()=>e({type:"closeSearch"})}))),!Boolean(a.results.length)&&r.a.createElement("p",{className:"alert alert-danger text-center shadow-sm"},"Sorry, we could not find any results for that search.")))))}}}]);