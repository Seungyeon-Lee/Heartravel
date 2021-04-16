<template>
    <div class="app-container">
        <CCard>
            <CCardHeader>
                <strong>메뉴 리스트</strong>
                <CButton @click="addCategory">
                    <small class="text-muted"> 추가</small>
                </CButton>
            </CCardHeader>
            <CCardBody>
                <div :class="`position-relative ${responsive ? 'table-responsive' : '' }`">
                    <table class="table">
                        <thead>
                        <tr>
                            <template v-for="(name, index) in columnNames">
                                <th
                                        :key="index"
                                >
                                    <slot :name="`${rawColumnNames[index]}-header`">
                                        <div class="d-inline">{{name}}</div>
                                    </slot>
                                </th>
                            </template>
                        </tr>
                        </thead>

                        <draggable
                                tag="tbody"
                                v-model="items"
                                v-bind="dragOptions"
                                @start="isDragging = true"
                                @end="isDragging = false"
                        >
                            <tr v-for="(item) in items" :key="item.name">
                                <td>{{ item.index }}</td>
                                <td>{{ item.name }}</td>
                              <!--  <td>{{ item.order }}</td> -->
                                <td>
                                    <CSwitch color="info" variant="3d" shape="square" :checked="item.status" v-bind="labelIcon"
                                             @update:checked="updateStatus(item.index, item.status)"/>
                                </td>
                                <td>
                                    <CButtonGroup size="sm" >
                                        <CButton color="secondary" @click="showClicked(item, item.index)"> 수정 </CButton>
                                        <CButton color="secondary" @click="deleteRow(item.name, item.index)"> 삭제 </CButton>
                                    </CButtonGroup>
                                </td>
                            </tr>
                        </draggable>
                    </table>
                </div>
                    </CCardBody>
            <CCardFooter>
                <CButtonGroup class="h_center">
                    <CButton color="btn btn-light" @click="setCategoryOrder">저장</CButton>
                </CButtonGroup>
            </CCardFooter>
        </CCard>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import * as CATEGORY_API from "../api/category";
    export default {
        name: "AdminMenuList",
        components: {
            draggable
        },
        data() {
            return {
                items: [],
                fields: [
                    { key: 'index', label: '번호' },
                    { key: 'name', label: '메뉴명' },
                 //   { key: 'order', label: '순서' },
                    { key: 'status', label: '노출' },
                    {
                        key: 'show_details',
                        label: ''
                    }
                ],
                labelIcon: {
                    labelOn: '\u2713',
                    labelOff: '\u2715'
                },
                details: [],
                dangerModal: false,
                dragging: false,
                nowIndex : 0,
            };
        },
        props: {
            responsive: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            this.getCategory()
        },
        methods: {
            getStatus(status) {
                return status === 'on'
            },
            getCategory: async function(){
                try {
                    const rs = await CATEGORY_API.getCategoryList();
                    this.items = rs.data.result;//.sort((a, b) => a.index - b.index)

                    for(let index in this.items)
                        this.items[index].status = this.getStatus(this.items[index].status)
                } catch (err) {
                    // console.error(err)
                }
            },
            updateStatus : async function (index, status) {
                try {
                    const rs = await CATEGORY_API.updateShowStatusCategory(index, {categ : status});
                    if (rs.data.code === "success") {
                        alert('상태가 변경되었습니다.');
                        this.refreshPage();
                    }
                } catch (err) {
                    // console.error(err)
                }
            },
            setCategoryOrder : async function() {
                try {
                    const rs = await CATEGORY_API.setCategoryOrder({categ_objs : this.items});
                    if (rs.data.code === "success") {
                        alert('순서가 변경되었습니다.');
                        this.refreshPage();
                    }
                } catch (err) {
                    // console.error(err)
                }
            },
            refreshPage() {
                this.$router.go(0)
            },
            deleteRow:async function (name, index) {
                if(confirm(name + " 카테고리를 삭제하시겠습니까?")) {
                    try {
                        const rs = await CATEGORY_API.deleteCategory(index);
                        if (rs.data.code === "success") {
                            alert(name + ' 카테고리를 삭제되었습니다');
                            this.refreshPage()
                            return;
                        }
                    } catch (err) {
                        // console.error(err)
                    }
                }
            },
            categoryLink (id) {
                return `/admin/category/${id.toString()}`
            },
            showClicked (item, index) {
                const categoryLink = this.categoryLink(index)
                this.$router.push({path: categoryLink})
            },
            addCategory() {
                this.$router.push('/admin/add-category')
            }
        },
        computed: {
            rawColumnNames () {
                if (this.fields) {
                    return this.fields.map(el => el.key || el)
                }
                return this.generatedColumnNames
            },
            columnNames () {
                if (this.fields) {
                    return this.fields.map(f => {
                        return f.label !== undefined ? f.label : this.pretifyName(f.key || f)
                    })
                }
                return this.rawColumnNames.map(el => this.pretifyName(el))
            },
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        }
    };
</script>

<style>
    .button {
        margin-top: 35px;
    }
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-group {
        min-height: 20px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
</style>