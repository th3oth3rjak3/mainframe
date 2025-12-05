using Microsoft.AspNetCore.Routing;

namespace Mainframe.Server.Infrastructure;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}