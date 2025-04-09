using BookXpert.Backend.Models.State;

namespace BookXpert.Backend.Repository.Interfaces;

public interface IStateRepository
{
    Task<IList<State>> GetAllAsync(CancellationToken cancellationToken);
}
