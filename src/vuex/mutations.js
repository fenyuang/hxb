const GET_DATA = 'GET_DATA'
const EDIT_ELE = 'EDIT_ELE'
const CHANGE_IMG_SRC = 'CHANGE_IMG_SRC'

export default {
  [GET_DATA] (state, obj) {
    state.eles.push(obj)
  },
  [EDIT_ELE] (state, obj) {
    state.editoEle = obj
  },
  [CHANGE_IMG_SRC] (state, data) {
    state.editoEle.imgSrc = data
  }
}
