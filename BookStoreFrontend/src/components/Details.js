import {Component} from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import EditForm from './EditForm'


@observer
class Details extends Component {

  constructor(props){
    super(props)
  }

  deleteStuff = () =>{
    this.props.bookStore.deleteBook(this.props.id)
  }

  reRender = () =>{
    this.forceUpdate()
  }



  render() {
    let id = this.props.id
    let book
    book = this.props.bookStore.getSingleBook(id) 
    
    if(book == null){
      setTimeout(() =>{
        this.forceUpdate()
      }, 1000)
      return(
        <div>
          <h1>Fetching.....</h1>
        </div>
      )
    }
    return (
      <div className="row">
        <div className= "col-md-6">
        <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
        <h4> {book.info}</h4>
        <h4>{book.moreInfo}</h4>
        <br />
        <br />
        <br />
        <div>
        <Link to="/products">Products</Link>
        </div>
          <br/>
          <br/>
          <br/>
          <br/>
        <div>
          <button type="button" className="btn btn-danager">
        <Link to="/products" onClick={this.deleteStuff}>Delete Book</Link>
          </button>
          </div>
        </div>
        <EditForm reRender={this.reRender} bookStore={this.props.bookStore} book={book} />
      </div>
    );
  }
}



export default Details