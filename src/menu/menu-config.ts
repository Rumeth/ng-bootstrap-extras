export interface NgbxMenuItem{
iconClass?:string;

label?:string;

labelClass?:string;

tooltip?:string;

itemClass?:string;

route?:string;

expanded?:boolean;

list?:NgbxMenuItem[];
}

export interface NgbxMenuList{
  width?:string;

  triggerIconClass?:string;

  triggerHeight?:string;

  header?:NgbxMenuItem;

  showSearch?:boolean;

  footer?:NgbxMenuItem;

  list?:NgbxMenuItem[];
}
