// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, Field, List, Icon, Cell, Image as VanImage, Tabbar, TabbarItem, NavBar, CellGroup } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(VanImage)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Cell).use(CellGroup)
