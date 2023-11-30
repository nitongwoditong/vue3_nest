<template>
  <div class="wraps">
    <!-- <div>
      <el-input v-model="search.keyWord" style="width: 300px"></el-input>
      <el-button @click="init" style="margin-left: 10px">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left: 10px"
        >添加</el-button
      >
    </div>
    <el-table border :data="tableData" style="width: 100%; margin-top: 30px">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="id" label="id" />
      <el-table-column>
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changeSize"
      style="float: right; margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="total"
    /> -->
    <div class="flex flex-items-center justify-between mb20px">
      <a-input-search
        v-model:value="search.keyWord"
        placeholder="关键字搜索"
        enter-button="搜索"
        size="large"
        @search="init"
      />
      <a-button type="primary" size="large" class="ml10px w-80px" @click="openDialog">添加</a-button>
    </div>
    
    <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <!-- <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm> -->
        <div class="flex flex-items-center justify-between">
            <a-button type="primary" size="small" class="ml10px w-50px" @click="edit(record)">编辑</a-button>
            <a-button type="danger" size="small" class="ml10px w-50px" @click="deleteRow(record)">删除</a-button>
        </div>
      </template>
    </template>
    </a-table>
  </div>

  <a-modal v-model:visible="dialogVisible" cancelText="取消" okText="保存" title="编辑" @ok="save">
    <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item
      label="名称："
      name="name"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="描述："
      name="desc"
    >
      <a-input v-model:value="formState.desc" />
    </a-form-item>
</a-form>
  </a-modal>
  <!-- <el-dialog v-model="dialogVisible" title="弹框" width="50%">
    <el-form :model="form">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item prop="desc" label="描述">
        <el-input v-model="form.desc" placeholder="描述"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script setup lang="ts">
import {computed, defineComponent, ref, reactive } from "vue";
import type { Ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { addUser, updateUser, delUser, getList } from "@/server";
interface DataItem {
  key: string;
  name: string;
  desc: string;
  id: number;
}
interface FormState {
    name: string;
    desc: string;
    id:number
}
const formState = reactive<FormState>({
    name: '',
    desc: '',
    id:0
    });

const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        width: '30%',
      },
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '',
        dataIndex: 'operation',
      },
    ];
    const dataSource: Ref<DataItem[]> = ref([
    //   {
    //     name: '小明',
    //     des: '牛的',
    //     id: 1,
    //   },
    //   {
    //     key: '1',
    //     name: 'Edward King 1',
    //     age: 32,
    //     address: 'London, Park Lane no. 1',
    //   },
    ]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
        const value = ref<string>('');
    // const edit = (key: string) => {
    //   editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    // };
    // const save = (key: string) => {
    //   Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    //   delete editableData[key];
    // };

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
      };
      dataSource.value.push(newData);
    };
const total = ref<number>(0);
//搜索框
const search = reactive({
  keyWord: "",
  page: 1,
  pageSize: 10,
});
//表单
const form = reactive({
  name: "",
  desc: "",
  id: 0,
});
//清空数据
const resetForm = reactive({ ...formState });
//表格数据
const tableData = ref([]);
//弹框开关
const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
  Object.assign(formState, resetForm);
  console.log(formState);
  
};
//初始化表格数据
const init = async () => {
  const list = await getList(search);
  dataSource.value = list?.data ?? [];
  total.value = list?.total ?? 0;
};
init();
const changeSize = (page) => {
  search.page = page;
  init();
};
//保存 和修改 表格数据
const save = async () => {
  if (formState.id) {
    await updateUser(formState);
  } else {
    await addUser(formState);
  }

  close();
  init();
};
//删除表格数据
const deleteRow = async (row) => {
  await delUser({ id: row.id });
  init();
};
//获取 详情
const edit = (row: DataItem) => {
    delete row.key
    console.log(row);
  dialogVisible.value = true;
  Object.assign(formState, row);
};
//关闭弹框
const close = () => {
  dialogVisible.value = false;
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background: #ccc;
}

.wraps {
    height: 100vh;
    padding: 30px;
    width:800px;
}

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
.ant-col {
    width:40px !important;
    flex:0 040px
}
</style>
