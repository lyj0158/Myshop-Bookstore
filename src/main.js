import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import { Icon, Tabbar, TabbarItem,
    NavBar, Swipe, SwipeItem, Badge,
    Grid, GridItem, Tab, Tabs, Card,
    Col, Row, Collapse, CollapseItem,
    Sidebar, SidebarItem, Empty, Lazyload,
    List,Form, Field, CellGroup,Button,
    PullRefresh, Cell, Image as VanImage,
    Overlay,Loading,Popup,Dialog,Area,SwipeCell,
    SubmitBar,Checkbox,CheckboxGroup,Stepper,AddressList,
    AddressEdit,ContactCard,RadioGroup,Radio,
    Uploader,CouponCell, CouponList,NoticeBar
} from 'vant';
import 'vant/lib/index.css';

createApp(App).use(Tabbar).use(TabbarItem).use(NavBar).use(Swipe)
    .use(RadioGroup).use(Radio)
    .use(SwipeItem).use(Badge).use(Grid).use(GridItem).use(Tab)
    .use(Tabs).use(Icon).use(Card).use(Col).use(Row).use(Empty)
    .use(Collapse).use(CollapseItem).use(Sidebar).use(SidebarItem)
    .use(Checkbox).use(CheckboxGroup).use(Stepper).use(AddressList)
    .use(Lazyload,{
        loading:require('./assets/images/loading.png')
    })
    .use(List).use(Form).use(Field).use(CellGroup).use(Button)
    .use(PullRefresh).use(Cell).use(VanImage).use(Overlay)
    .use(Loading).use(Popup).use(Dialog).use(Area).use(SwipeCell)
    .use(SubmitBar).use(AddressEdit).use(ContactCard).use(Uploader)
    .use(CouponCell).use(CouponList).use(NoticeBar)
    .use(store).use(router).mount('#app')
