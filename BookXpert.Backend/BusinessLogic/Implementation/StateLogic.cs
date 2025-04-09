using BookXpert.Backend.BusinessLogic.Interfaces;
using BookXpert.Backend.Models.State;
using BookXpert.Backend.Repository.Interfaces;

namespace BookXpert.Backend.BusinessLogic.Implementation;

public class StateLogic : IStateLogic
{
    #region Fields
    private readonly IStateRepository _stateRepository;
    #endregion
    #region Constructors
    public StateLogic(IStateRepository stateRepository)
    {
        _stateRepository = stateRepository;
    }
    #endregion

    #region Methods
    public async Task<IEnumerable<State>> GetAllStatesAsync(CancellationToken cancellation)
    {
        return await _stateRepository.GetAllAsync(cancellation);
    }
    #endregion
}
