<script setup>
    import axios from 'axios';
    import { ref, onMounted, reactive } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';

    const users = ref([]);

    const form = reactive({
        name: '',
        email: '',
        password: '',
    })

    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })

    const getUsers = () => {
        axios.get('/api/users')
        .then((response) => {
            users.value = response.data;
        })
    }

    const emptyForm = () => {
        $("#name").val('');
        $("#email").val('');
        $("#password").val('');
    }

    const createUser = (values, {resetForm}) => {
        console.log(values);
        axios.post('/api/users', values)
        .then((response) => {
            emptyForm();
            getUsers();

            $('#createUserModal').modal('hide');

            resetForm();
        });
    }

    onMounted(() => {
        getUsers();
    })
</script>
<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Users</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <button type="button" class="mb-2 btn btn-primary" data-toggle="modal" data-target="#createUserModal">
                Add User
            </button>
            <div class="card">
                <h6 class="card-header">User Data</h6>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 10px;">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registered Date</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="emptyForm">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <Field type="text" class="form-control" name="name" id="name"
                            :class="{'is-invalid': errors.name}"
                            placeholder="Enter full name" required/>
                        <span class="invalid-feedback">{{ errors.name }}</span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field type="email" class="form-control" name="email" id="email"
                            :class="{'is-invalid': errors.email}"
                            placeholder="Enter email address" required/>
                        <span class="invalid-feedback">{{ errors.email }}</span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field type="password" class="form-control" name="password"
                            :class="{'is-invalid': errors.password}"
                            placeholder="Enter password" id="password" required/>
                        <span class="invalid-feedback">{{ errors.password }}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="emptyForm">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </Form>
            </div>
        </div>
    </div>
</template>