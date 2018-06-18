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
  state = {
    modalVisible: false,
    media: null
  }
  handleOpenModal = (media) => {
    this.setState({
      modalVisible: true,
      media
    })
  }
  handleCloseModal = (event) => {
    this.setState({
      modalVisible: false,
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
            this.state.modalVisible && 
            <ModalContainer>
              <Modal handleClick={this.handleCloseModal}>
                <VideoPlayer 
                  autoplay
                  title={this.state.media.title}
                  src={this.state.media.src}
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
    search: searchResults
  }
}

export default connect(mapStateToProps)(Home)
