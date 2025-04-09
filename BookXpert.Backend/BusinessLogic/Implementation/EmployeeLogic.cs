using BookXpert.Backend.BusinessLogic.Interfaces;
using BookXpert.Backend.Models.Employee;
using BookXpert.Backend.Repository.Interfaces;

namespace BookXpert.Backend.BusinessLogic.Implementation;

public class EmployeeLogic:IEmployeeLogic
{
    #region Fields
    private readonly IEmployeeRepository _employeeRepository;
    #endregion
    #region Constructors
    public EmployeeLogic(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }
    #endregion
    #region Methods
   
    public async Task AddEmployeeAsync(Employee employee, CancellationToken cancellationToken)
    {
        if (await _employeeRepository.IsDuplicateAsync(employee.Name,cancellationToken))
            throw new Exception("Employee with this name already exists.");

        await _employeeRepository.AddAsync(employee, cancellationToken);
    }

    public async Task DeleteEmployeeAsync(int id, CancellationToken cancellationToken)
    {
        await _employeeRepository.DeleteAsync(id, cancellationToken);
    }

    public async Task DeleteMultipleEmployeesAsync(List<int> ids, CancellationToken cancellationToken)
    {
        await _employeeRepository.DeleteMultipleAsync(ids, cancellationToken);
    }

    public async Task<Employee?> GetEmployeeByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetByIdAsync(id,cancellationToken);
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetAllAsync(page, pageSize,cancellationToken);
    }

    public async Task<int> GetTotalCountAsync(CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetTotalCountAsync(cancellationToken);
    }

    public async Task<bool> IsDuplicateAsync(string name, CancellationToken cancellationToken, int? idToExclude = null)
    {
        return await _employeeRepository.IsDuplicateAsync(name,cancellationToken, idToExclude);
    }

    public async Task<IEnumerable<Employee>> SearchEmployeesAsync(string name, CancellationToken cancellationToken)
    {
        return await _employeeRepository.SearchByNameAsync(name, cancellationToken);
    }

    public async Task UpdateEmployeeAsync(Employee employee, CancellationToken cancellationToken)
    {
        if (await _employeeRepository.IsDuplicateAsync(employee.Name,cancellationToken, employee.Id))
            throw new Exception("Employee with this name already exists.");

        await _employeeRepository.UpdateAsync(employee,cancellationToken);
    }
    #endregion

}
