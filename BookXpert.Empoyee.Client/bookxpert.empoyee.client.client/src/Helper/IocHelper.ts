import EmployeeRepository from "../Repositories/EmployeeRepository/EmployeeRepository";
import { IEmployeeRepository } from "../Repositories/EmployeeRepository/IEmployeeRepository";
import { IStateRepository } from "../Repositories/StateRepository/IStateRepository";
import StateRepository from "../Repositories/StateRepository/StateRepository";

export default class IocHelper{

    private static stateRepository:IStateRepository | null = null;
    private static employeeRepository:IEmployeeRepository | null=null;

     public readonly getStateRepository=():IStateRepository=>{
        if(IocHelper.stateRepository!==null)
            return IocHelper.stateRepository;

        IocHelper.stateRepository=new StateRepository();
        return IocHelper.stateRepository;
    }

    public readonly getEmployeeRepository=():IEmployeeRepository=>{
        if(IocHelper.employeeRepository!==null)
            return IocHelper.employeeRepository;

        IocHelper.employeeRepository=new EmployeeRepository();
        return IocHelper.employeeRepository;
    }
}