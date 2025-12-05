using System.Reflection;
using Microsoft.AspNetCore.Routing;

namespace Mainframe.Server.Infrastructure;

public static class EndpointExtensions
{
    public static IEndpointRouteBuilder MapEndpointsFromAssembly(this IEndpointRouteBuilder app, Assembly assembly)
    {
        var endpointTypes = assembly
            .GetTypes()
            .Where(t => t is { IsClass: true, IsAbstract: false } && typeof(IEndpoint).IsAssignableFrom(t));

        foreach (var type in endpointTypes)
        {
            var endpoint = (IEndpoint)Activator.CreateInstance(type)!;
            endpoint.MapEndpoint(app);
        }

        return app;
    }
}