export interface NgbxMenuItem{
iconClass?:string;

label?:string;

labelClass?:string;

itemClass?:string;

route?:string;

expanded?:boolean;

list?:NgbxMenuItem[];
}

export interface NgbxMenuList{
  header?:NgbxMenuItem;

  footer?:NgbxMenuItem;

  list?:NgbxMenuItem[];
}
