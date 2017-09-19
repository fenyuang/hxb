import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login/Login'
import Register from '../page/login/Register'
import ModifyPassword from '../page/login/ModifyPassword'
import Protocol from '../page/login/Protocol'
import FoundSchool from '../page/login/FoundSchool'
import Index from '../page/index/Index'
import Preview from '../page/index/Preview'
import Classify from '../page/index/Classify'
import CompositeList from '../page/index/CompositeList'
import Search from '../page/index/Search'
import SearchList from '../page/index/SearchList'
import NewCurriculum from '../page/index/NewCurriculum'
import Editor from '../page/index/Editor'
import HeaderNav from '../components/HeaderNav'
import Student from '@/page/student/Student.vue'
import StuInfo from '@/page/student/StuInfo.vue'
import StuPreOrder from '@/page/student/StuPreOrder.vue'
import StuOrderInfo from '@/page/student/StuOrderInfo.vue'
import SchInfo from '@/page/school/SchInfo.vue'
import SchRule from '@/page/school/SchRule.vue'
import SchSafe from '@/page/school/SchSafe.vue'
import AddSch from '@/page/school/AddSch.vue'
import AddRole from '@/page/school/AddRole.vue'
import Conversion from '../page/Documentary/Conversion'
import AddClue from '../page/Documentary/AddClue'
import Visit from '../page/Documentary/Visit'
import SignUp from '../page/Documentary/SignUp'
import ClueHierarchyManagement from '../page/Documentary/ClueHierarchyManagement'
import RemoveClue from '../page/Documentary/RemoveClue'
import AddClueGrade from '../page/Documentary/AddClueGrade'
import EditClue from '../page/Documentary/EditClue'
import StateManagement from '../page/Documentary/StateManagement'
import RemoveVisit from '../page/Documentary/RemoveVisit'
import AddState from '../page/Documentary/AddState'
import VisitAdmin from '../page/Documentary/VisitAdmin'
import EditVisit from '../page/Documentary/EditVisit'
import CurriculumMarketing from '../page/Curriculum marketing/CurriculumMarketing'
import CourseDetails from '../page/Curriculum marketing/CourseDetails'
import ViewOutline from '../page/Curriculum marketing/ViewOutline'
import ChapterManagement from '../page/Curriculum marketing/ChapterManagement'
import NewUnit from '../page/Curriculum marketing/NewUnit'
import SubsectionManagement from '../page/Curriculum marketing/SubsectionManagement'
import AddSection from '../page/Curriculum marketing/AddSection'
import ListDetails from '../page/Curriculum marketing/ListDetails'
import CouponList from '../page/Curriculum marketing/CouponList'
import NewCoupon from '../page/Curriculum marketing/NewCoupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    },
    {
      path: '/ModifyPassword',
      component: ModifyPassword
    },
    {
      path: '/Protocol',
      component: Protocol
    },
    {
      path: '/FoundSchool',
      component: FoundSchool
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/Preview:id',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/Classify',
      component: Classify
    },
    {
      path: '/CompositeList',
      component: CompositeList
    },
    {
      path: '/Search',
      component: Search
    },
    {
      path: '/SearchList:id',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/NewCurriculum',
      component: NewCurriculum
    },
    {
      path: '/Editor:id',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/nav',
      component: HeaderNav
    },
    {
      path: '/Student',
      component: Student
    },
    {
      path: '/StuInfo',
      component: StuInfo
    },
    {
      path: '/StuPreOrder',
      component: StuPreOrder
    },
    {
      path: '/StuOrderInfo',
      component: StuOrderInfo
    },
    {
      path: '/SchInfo',
      component: SchInfo
    },
    {
      path: '/SchRule',
      component: SchRule
    },
    {
      path: '/SchSafe',
      component: SchSafe
    },
    {
      path: '/AddSch',
      component: AddSch
    },
    {
      path: '/AddRole',
      component: AddRole
    },
    {
      path: '/Conversion',
      component: Conversion
    },
    {
      path: '/AddClue',
      component: AddClue
    },
    {
      path: '/Visit',
      component: Visit
    },
    {
      path: '/SignUp',
      component: SignUp
    },
    {
      path: '/ClueHierarchyManagement',
      component: ClueHierarchyManagement
    },
    {
      path: '/RemoveClue',
      component: RemoveClue
    },
    {
      path: '/AddClueGrade',
      component: AddClueGrade
    },
    {
      path: '/EditClue',
      component: EditClue
    },
    {
      path: '/StateManagement',
      component: StateManagement
    },
    {
      path: '/RemoveVisit',
      component: RemoveVisit
    },
    {
      path: '/AddState',
      component: AddState
    },
    {
      path: '/VisitAdmin',
      component: VisitAdmin
    },
    {
      path: '/EditVisit',
      component: EditVisit
    },
    {
      path: '/CurriculumMarketing',
      component: CurriculumMarketing
    },
    {
      path: '/CourseDetails',
      component: CourseDetails
    },
    {
      path: '/ViewOutline',
      component: ViewOutline
    },
    {
      path: '/ChapterManagement',
      component: ChapterManagement
    },
    {
      path: '/NewUnit',
      component: NewUnit
    },
    {
      path: '/SubsectionManagement',
      component: SubsectionManagement
    },
    {
      path: '/AddSection',
      component: AddSection
    },
    {
      path: '/ListDetails',
      component: ListDetails
    },
    {
      path: '/CouponList',
      component: CouponList
    },
    {
      path: '/NewCoupon',
      component: NewCoupon
    }
  ]
})
