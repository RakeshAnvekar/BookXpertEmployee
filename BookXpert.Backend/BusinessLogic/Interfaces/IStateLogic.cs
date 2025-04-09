using BookXpert.Backend.Models.State;

namespace BookXpert.Backend.BusinessLogic.Interfaces;

public interface IStateLogic
{
    #region Methods
    Task<IEnumerable<State>> GetAllStatesAsync(CancellationToken cancellation);
    #endregion
}
