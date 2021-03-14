import React from 'react'

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input className="form-control" id="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Birthday Date</label>
        <input type="date" placeholder="2000-12-31" className="form-control" id="birthday" />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <input className="form-control" id="gender" />
      </div>
      <div className="form-group">
        <label htmlFor="height">height</label>
        <input className="form-control" id="height" />
      </div>
      <div className="form-group">
        <label htmlFor="name">weight</label>
        <input
        type=""
        className="form-control" id="weight" />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}
export default Form
