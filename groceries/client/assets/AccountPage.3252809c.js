import{_,r as f,w as b,c as v,a as h,P as y,S,b as c,d as e,e as l,v as d,f as r,t as m,n as x,g as A,A as u,o as p,p as F,h as E,i as w}from"./index.14fc0121.js";const P={setup(){const n=f({});return b(()=>{n.value={...u.account}}),{editable:n,account:v(()=>u.account),toggleHidden(t){document.querySelectorAll(`.${t}-element`).forEach(o=>o.classList.toggle("hidden")),document.getElementById(t+"Form").classList.toggle("hidden"),document.getElementById(t+"Floating").focus()},async editAccount(t){try{this.toggleHidden(t),await h.editAccount(n.value)}catch(a){y.error(a.message,"[editAccount] > AccountPage")}}}},components:{Spinner:S}},s=n=>(F("data-v-00a62155"),n=n(),E(),n),k={class:"pos-relative picture-element",id:"pictureElement"},I=["src"],q={class:"input-group"},B={class:"form-floating mb-3"},N=s(()=>e("label",{for:"pictureFloating"},"Picture URL",-1)),C=s(()=>e("button",{class:"btn btn-light bg-light submit",type:"submit"},[e("i",{class:"mdi mdi-plus"})],-1)),H={class:"d-flex gap-2 align-items-center name-element",id:"nameElement"},L={class:"name-element"},U={class:"input-group"},V={class:"form-floating mb-3"},D=s(()=>e("label",{for:"nameFloating"},"Name",-1)),M=s(()=>e("button",{class:"btn btn-light bg-light submit",type:"submit"},[e("i",{class:"mdi mdi-plus"})],-1)),R={class:"d-flex gap-2 align-items-center"},z={class:"m-0 email-element"},T={key:1,class:"flex-grow-1 d-flex align-items-center"},j=s(()=>e("p",{class:"fadeIn m-auto fs-1 fw-700 p-3"},"Could not find your account.",-1));function G(n,t,a,o,J,K){const g=w("Spinner");return o.account.id?(p(),c("div",{key:0,class:"account m-auto d-flex flex-column gap-3 align-items-center text-visible",style:x({backgroundImage:`url(${o.account.coverImg})`})},[e("div",k,[e("img",{class:"account-photo picture-element",src:o.account.picture,alt:""},null,8,I),e("i",{class:"mdi mdi-square-edit-outline edit-icon picture-element",type:"button","aria-label":"Edit Picture",onClick:t[0]||(t[0]=i=>o.toggleHidden("picture"))})]),e("form",{onSubmit:t[2]||(t[2]=r(i=>o.editAccount("picture"),["prevent"])),class:"hidden",id:"pictureForm"},[e("div",q,[e("div",B,[l(e("input",{type:"url",class:"form-control",name:"pictureFloating",id:"pictureFloating",placeholder:"Picture URL",required:"","onUpdate:modelValue":t[1]||(t[1]=i=>o.editable.picture=i),onfocus:"select()"},null,512),[[d,o.editable.picture]]),N]),C])],32),e("div",H,[e("h1",L,m(o.account.name),1),e("i",{class:"mdi mdi-square-edit-outline name-element",type:"button","aria-label":"Edit Name",onClick:t[3]||(t[3]=i=>o.toggleHidden("name"))})]),e("form",{onSubmit:t[5]||(t[5]=r(i=>o.editAccount("name"),["prevent"])),class:"hidden",id:"nameForm"},[e("div",U,[e("div",V,[l(e("input",{type:"text",class:"form-control",name:"nameFloating",id:"nameFloating",placeholder:"Name",required:"","onUpdate:modelValue":t[4]||(t[4]=i=>o.editable.name=i),onfocus:"select()"},null,512),[[d,o.editable.name]]),D]),M])],32),e("div",R,[e("p",z,m(o.account.email),1)])],4)):(p(),c("div",T,[j,A(g)]))}const Q=_(P,[["render",G],["__scopeId","data-v-00a62155"]]);export{Q as default};