using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookXpert.Backend.Models.Employee;

public class Employee
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string? Name { get; set; }

    [MaxLength(100)]
    public string? Designation { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public int Age { get; set; }  

    [Required]
    public DateTime DateOfJoin { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Salary { get; set; }

    [Required]
    [MaxLength(10)]
    public string? Gender { get; set; }

    [Required]
    public int StateId { get; set; }

    [ForeignKey("StateId")]
    public BookXpert.Backend.Models.State.State? State { get; set; }
}
