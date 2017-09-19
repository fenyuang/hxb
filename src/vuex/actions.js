export default {
  addNum ({commit}, data) {
    commit('GET_DATA', data)
  },
  editEle ({commit}, obj) {
    commit('EDIT_ELE', obj)
  },
  changeStyle ({commit}, data) {
    commit('CHANG_STYLE', data)
  }
}
