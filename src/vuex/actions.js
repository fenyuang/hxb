export default {
  addNum ({commit}, data) {
    commit('GET_DATA', data)
  },
  editEle ({commit}, obj) {
    commit('EDIT_ELE', obj)
  },
  changeImgSrc ({commit}, data) {
    commit('CHANGE_IMG_SRC', data)
  }
}
