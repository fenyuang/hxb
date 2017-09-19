const GET_DATA = 'GET_DATA'
const EDIT_ELE = 'EDIT_ELE'
const CHANG_STYLE = 'CHANG_STYLE'

export default {
  [GET_DATA] (state, obj) {
    state.eles.push(obj)
  },
  [EDIT_ELE] (state, obj) {
    state.editoEle = obj
  },
  [CHANG_STYLE] (state, data) {
    state.editoEle.color = data
    state.editoEle.textAlign = data
    state.editoEle.fontSize = data
  }
}
