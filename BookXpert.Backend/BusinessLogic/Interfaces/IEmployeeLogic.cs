using BookXpert.Backend.Models.Employee;

namespace BookXpert.Backend.BusinessLogic.Interfaces;

public interface IEmployeeLogic
{
    Task<IEnumerable<Employee>> GetEmployeesAsync(int page, int pageSize,CancellationToken cancellationToken);
    Task<int> GetTotalCountAsync(CancellationToken cancellationToken);
    Task<Employee> GetEmployeeByIdAsync(int id, CancellationToken cancellationToken);
    Task<IEnumerable<Employee>> SearchEmployeesAsync(string name, CancellationToken cancellationToken);
    Task AddEmployeeAsync(Employee employee, CancellationToken cancellationToken);
    Task UpdateEmployeeAsync(Employee employee, CancellationToken cancellationToken);
    Task DeleteEmployeeAsync(int id, CancellationToken cancellationToken);
    Task DeleteMultipleEmployeesAsync(List<int> ids, CancellationToken cancellationToken);
    Task<bool> IsDuplicateAsync(string name, CancellationToken cancellationToken, int? idToExclude = null);
}
