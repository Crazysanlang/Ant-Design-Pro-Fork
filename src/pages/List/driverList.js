import React, {PureComponent} from 'react';
import {
  Form,
  Row,
  Col,
  Card,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table ,
} from "antd"
import { connect } from 'dva';
import PageHeader from'@/components/PageHeader';
import  style from './driverList.less';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { Option } = Select;

@connect(({ driverList, loading }) => ({
  driverList,
  loading: loading.models.driverList,
}))

@Form.create()

export default class DriverUser extends PureComponent {
  state={
    formValues:{},
    editingKey:'',
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'driverList/fetchDriverList',
    });
  }

  // 重置方法
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
  }
  // 查询数据
  handleSearch = e =>{
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err,fieldsValue) => {
      if (err) return;
      console.log('Received values of form: ', fieldsValue);
      const values= {
        ...fieldsValue
      }
      this.setState({
        formValues:values
      })
      dispatch({
        type:'driverList/fetchDriverList',
        payload:values
      })
    })
  }

  // 确认弹窗
  showMdal= (flag,index)=>{
    let that = this;
    console.log(that)
    if(flag){
      confirm({
        title: '您确定启用该车辆?',
        onOk(e) {
          console.log('OK');
          console.log(e);
          console.log(index.key)
          that.props.dispatch({
            type: 'driver/remove',
            payload:{
              index:index.key
            }
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
     
    }else{
      confirm({
        title: '您确定停用该车辆?',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
  searchBox(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="司机名称">
              {getFieldDecorator('name',{rules:[{
                required:true,
                message:'请输入您要搜索的司机名称'
              }],
            })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">停用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }
  render(){
    const { driverList:{data},loading } = this.props;
    const breadcrumbList=[{
      title:"首页",
      href:"/"  
    },{
      title:"车辆维护",
    }]
    const columns=[
      {
        title:'车牌号',
        dataIndex:'carNumber',
        key:'carNumber'
      },
      {
        title:'吨位',
        dataIndex:'weight',
        key:'weight'
      },
      {
        title:'车型',
        dataIndex:'carType',
        key:'carType'
      },
      {
        title:'车主姓名',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'车主手机',
        dataIndex:'phone',
        key:'phone'
      },
      {
        title:'状态',
        dataIndex:'status',
        key:'status'
      },
      {
        title:'是否可用',
        dataIndex:'isUse',
        key:'isUse',
        render:(record)=>{
          const isUse= parseInt(record);
          return(
            <div>
            {isUse?(<span>启用</span>):(<span>停用</span>)
            }
            </div>
          )
        }
      },
      {
        title:'操作',
        key:'operation',
        dataIndex:'operation',
        render: (record,index) =>  {
          const operation= parseInt(record);
          return(
            <div>
            {operation?
              (<Button type="primary" onClick={()=>this.showMdal(true,index)}>启用</Button>):(<Button type="danger" onClick={()=>this.showMdal(false,index)}>停用</Button>)
            }
            </div>
          )
        }  
      }
    ]
    return( 
      <div>
        <PageHeader title="车辆维护" breadcrumbList={breadcrumbList}>
        </PageHeader>
        <div className={style.tableListForm}>{this.searchBox()}</div>
        <div className={style.tableBox}>
          <Table 
            columns={columns}
            dataSource={data}
            loading={loading}
          />
        </div>
      </div>

    );
  }
}
