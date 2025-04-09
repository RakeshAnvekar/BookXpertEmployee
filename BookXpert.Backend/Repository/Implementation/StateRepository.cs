using BookXpert.Backend.Context;
using BookXpert.Backend.Models.State;
using BookXpert.Backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookXpert.Backend.Repository.Implementation;

public class StateRepository : IStateRepository
{
    private readonly BookXpertApplicationDbContext _context;

    public StateRepository(BookXpertApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<State>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.States.OrderBy(s => s.Name).ToListAsync(cancellationToken);
    }
}
