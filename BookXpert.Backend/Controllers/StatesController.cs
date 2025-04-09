using BookXpert.Backend.BusinessLogic.Interfaces;
using BookXpert.Backend.Models.State;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookXpert.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        #region Fields
        private readonly IStateLogic _stateLogic;
        private readonly ILogger<StatesController> _logger;
        #endregion

        #region Constructors
        public StatesController(IStateLogic stateLogic, ILogger<StatesController> logger)
        {
            _stateLogic = stateLogic;
            _logger = logger; 
        }
        #endregion

        #region Methods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<State>>> GetStates()
        {
            try
            {
                var states = await _stateLogic.GetAllStatesAsync(HttpContext.RequestAborted);
                return Ok(states);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Class name: {nameof(StatesController)} Error while executing GetStates. Exception: {ex.Message}");
                return BadRequest("An error occurred while fetching states.");
            }
            
        }
        #endregion
    }
}
