import React, { Component } from 'react'
import HomeLayout from '../components/home-layout'
import Categories from '../../categories/components/categories'
import Related from '../../pages/components/related'
import ModalContainer from '../../widgets/containers/modal'
import Modal from '../../widgets/components/modal'
import HandleError from '../../error/containers/handle-error'
import VideoPlayer from '../../player/containers/video-player'
import { connect } from 'react-redux'
import { List as list } from 'immutable'

class Home extends Component {
  // state = {
  //   modalVisible: false,
  //   media: null
  // }
  handleOpenModal = (id) => {
    // this.setState({
    //   modalVisible: true,
    //   media
    // })
    this.props.dispatch({
      type: 'OPEN_MODAL',
      payload: {
        visibility: true,
        mediaId: id
      }
    })
  }
  handleCloseModal = (event) => {
    // this.setState({
    //   modalVisible: false,
    // })
    this.props.dispatch({
      type: 'CLOSE_MODAL',
      payload: {
        visibility: false
      }
    })
  }
  render() {
    return (
      <HandleError>
        <HomeLayout>
          <Related />
          <Categories 
            categories={this.props.categories}
            handleOpenModal={this.handleOpenModal}
            search={this.props.search}
          />
          {
            this.props.modal.get('visibility') && 
            <ModalContainer>
              <Modal handleClick={this.handleCloseModal}>
                <VideoPlayer 
                  autoplay
                  id={this.props.modal.get('mediaId')}
                  // title={this.state.media.title}
                  // src={this.state.media.src}
                />
              </Modal>
            </ModalContainer>
          }
        </HomeLayout>
      </HandleError>
    )
  }
}

function mapStateToProps(state, props) {
  const categories = state.get('data').get('categories').map(categoryId => {
    return state.get('data').get('entities').get('categories').get(categoryId)
  })
  const search = state.get('data').get('search')
  let searchResults = list()
  if (search) {
    const mediaList = state.get('data').get('entities').get('media')
    searchResults = mediaList.filter(item => {
      return item.get('author').toLowerCase().includes(search.toLowerCase())
    }).toList()
  }
  return {
    categories,
    search: searchResults,
    modal: state.get('modal')
  }
}

export default connect(mapStateToProps)(Home)
