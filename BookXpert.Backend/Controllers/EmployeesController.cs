using BookXpert.Backend.BusinessLogic.Interfaces;
using BookXpert.Backend.Models.Employee;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookXpert.Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    #region Fields
    private readonly IEmployeeLogic _employeeLogic;
    private readonly ILogger<EmployeesController> _logger;
    #endregion

    #region Constructor
    public EmployeesController(IEmployeeLogic employeeLogic, ILogger<EmployeesController> logger)
    {
        _employeeLogic = employeeLogic; 
        _logger = logger;
    }
    #endregion

    #region Methods
    [HttpGet("paged")]
    public async Task<IActionResult> GetEmployees(int page = 1, int pageSize = 5)
    {
        try
        {
            var employees = await _employeeLogic.GetEmployeesAsync(page, pageSize,HttpContext.RequestAborted);
            var total = await _employeeLogic.GetTotalCountAsync(HttpContext.RequestAborted);

            return Ok(new { data = employees, totalCount = total });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: GetEmployees | Exception: {ex.Message}");
            return BadRequest("Failed to fetch employees.");
        }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployeeById(int id)
    {
        try
        {
            var employee = await _employeeLogic.GetEmployeeByIdAsync(id,HttpContext.RequestAborted);
            if (employee == null)
                return NotFound();

            return Ok(employee);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: GetEmployeeById | Exception: {ex.Message}");
            return BadRequest("Error while fetching employee.");
        }
    }
    [HttpGet("search")]
    public async Task<IActionResult> Search(string name)
    {
        try
        {
            var results = await _employeeLogic.SearchEmployeesAsync(name,HttpContext.RequestAborted);
            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: Search | Exception: {ex.Message}");
            return BadRequest("Search failed.");
        }

    }
    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
    {
        try
        {
            await _employeeLogic.AddEmployeeAsync(employee, HttpContext.RequestAborted);
            return Ok(new { message = "Employee added successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: AddEmployee | Exception: {ex.Message}");
            return BadRequest("Failed to add employee.");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee employee)
    {
        if (id != employee.Id)
            return BadRequest("Employee ID mismatch.");

        try
        {
            await _employeeLogic.UpdateEmployeeAsync(employee,HttpContext.RequestAborted);
            return Ok(new { message = "Employee updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: UpdateEmployee | Exception: {ex.Message}");
            return BadRequest("Failed to update employee.");
        }
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        try
        {
            await _employeeLogic.DeleteEmployeeAsync(id,HttpContext.RequestAborted);
            return Ok(new { message = "Employee deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: DeleteEmployee | Exception: {ex.Message}");
            return BadRequest("Error while deleting employee.");
        }
    }
    [HttpPost("delete-multiple")]
    public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
    {
        try
        {
            await _employeeLogic.DeleteMultipleEmployeesAsync(ids,HttpContext.RequestAborted);
            return Ok(new { message = "Employees deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: DeleteMultiple | Exception: {ex.Message}");
            return BadRequest("Bulk delete failed.");
        }
    }

    [HttpGet("check-duplicate")]
    public async Task<IActionResult> CheckDuplicate(string name, int? idToExclude = null)
    {
        try
        {
            var isDuplicate = await _employeeLogic.IsDuplicateAsync(name,HttpContext.RequestAborted, idToExclude);
            return Ok(isDuplicate);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Class name: {nameof(EmployeesController)} | Method: CheckDuplicate | Exception: {ex.Message}");
            return BadRequest("Error while checking duplicates.");
        }
    }
    #endregion
}
