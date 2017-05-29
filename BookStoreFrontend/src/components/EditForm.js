import React from 'react'
import './../models/BookStore'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'



const EditForm = observer(({bookStore, book, reRender}) => {

   function handleSubmit(evt){
        evt.preventDefault()
        const target = evt.target
        var editedBook = {}
        editedBook.id = book.id
        editedBook.title = target.title.value
        editedBook.info = target.info.value
        editedBook.moreInfo = target.moreInfo.value
        bookStore.editBook(editedBook)
        // Not pretty but MobX won't update
        setTimeout(function() {
            reRender()
        }, 1500);
    }

        var title = book.title
        var info = book.info
        var moreInfo = book.moreInfo
    return(
    <div className="col-md-6">
            <h3>Edit Book? </h3>
        <form id="la" onSubmit= {handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                type="text" defaultValue={title} 
                className="form-control" id="title"/>

            </div>
            <div className="form-group">
                <label htmlFor="info">Info</label>
                <input 
                type="text" defaultValue={info}
                className="form-control" id="info"/>

            </div>
            <div className="form-group">
                <label htmlFor="moreInfo">More Info</label>
                <input 
                type="text" defaultValue={moreInfo}
                className="form-control" id="moreInfo"/>
            </div>
                <button type="submit"className="btn">
                    Save Changes
                </button>
        </form>
    </div>
    )
})



export default EditForm