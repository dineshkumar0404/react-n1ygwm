import React, { Component } from 'react';
import data from './pages/data.json';
import Addmodel from './Addmodel.js';
import { Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/RegisterForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: data,
      selecteduser: null,
      detailuser: null,
      showModel: false,
      loading: true,
    };
  }
  passEmployee(e) {
    this.state.users.push(e);
    this.setState({ users: this.state.users });
  }

  updateForm(e) {
    this.setState({ showModel: !this.state.showModel });
    this.state.users.splice(e.index, e);
  }

  DeleteRow = (index, name) => {
    this.state.users.splice(index, 1);
    this.setState({ users: this.state.users });
    // console.log(this.state.users.employee_name)
    alert('Do you want to delete EmployeeName : ' + name);
  };

  Details = (users) => {
    this.setState({ detailuser: true });
    this.setState({ selecteduser: users });
  };

  Update = (users) => {
    this.setState({ showModel: true });
    this.setState({ selecteduser: users });
  };

  render() {
    let DisplayData = this.state.users.map((users, index) => {
      return (
        <tr key={index} style={{ textAlign: 'center' }}>
          <td>{users.id}</td>
          <td>{users.employee_name}</td>
          <td>{users.employee_salary}</td>
          <td>{users.employee_age}</td>
          <td>{users.email}</td>
          <td>{users.designation}</td>
          <td>
            <img src={users.file} style={{ height: '75px' }} />
          </td>

          <td>
            <button
              className="btn btn-danger m-1"
              onClick={() => {
                this.DeleteRow(index, users.employee_name);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-info m-1"
              onClick={() => this.Update(users)}
            >
              Update
            </button>

            <button
              className="btn btn-info m-1"
              onClick={() => this.Details(users)}
            >
              Details
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Addmodel passEmployee={(e) => this.passEmployee(e)} />

        <table className="table table-striped ">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>EmployeeSalary</th>
              <th>EmployeeAge</th>
              <th>Email ID</th>
              <th>Designation</th>
              <th>ProfileImage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>

        <Modal isOpen={this.state.showModel}>
          <ModalBody>
            <RegisterForm
              data={this.state.selecteduser}
              updateForm={(e) => this.updateForm(e)}
              cancelForm={(e) =>
                this.setState({ showModel: !this.state.showModel })
              }
            />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.detailuser}>
          <div style={{ backgroundColor: 'white', width: '950px' }}>
            <ModalBody>
              <table
                className="table table-striped mr-1"
                style={{ textAlign: 'center', width: '100px' }}
              >
                <thead>
                  <tr>
                    <th>EmployeeId</th>
                    <th>EmployeeName</th>
                    <th>EmployeeSalary</th>
                    <th>EmployeeAge</th>
                    <th>Email ID</th>
                    <th>Designation</th>
                    <th>ProfileImage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.id
                        : ''}
                    </td>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.employee_name
                        : ''}
                    </td>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.employee_salary
                        : ''}
                    </td>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.employee_age
                        : ''}
                    </td>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.email
                        : ''}
                    </td>
                    <td>
                      {this.state.selecteduser
                        ? this.state.selecteduser.designation
                        : ''}
                    </td>
                    <td>
                      <img
                        src={
                          this.state.selecteduser
                            ? this.state.selecteduser.file
                            : ''
                        }
                        style={{ height: '75px' }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() =>
                    this.setState({ detailuser: !this.state.detailuser })
                  }
                >
                  Close
                </button>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
