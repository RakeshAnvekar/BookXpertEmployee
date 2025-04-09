using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;


namespace BookXpert.Backend.Models.State
{
    public class State
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string? Name { get; set; }

        public Collection<BookXpert.Backend.Models.Employee.Employee>? employees { get; set; }
    }
}
