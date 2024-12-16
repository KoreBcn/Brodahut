FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Brodahut Fantasy.csproj", "./"]
RUN dotnet restore "Brodahut.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "Brodahut.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Brodahut.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Brodahut Fantasy.dll"]