using System;
using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
       CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
                opt.MapFrom(src => src.Photos.FirstOrDefault( x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt =>
                opt.MapFrom(src => (DateTime.Now.Year - src.DateOfBirth.Year )));
            
            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
                opt.MapFrom(src => src.Photos.FirstOrDefault( x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt =>
                opt.MapFrom(src => (DateTime.Now.Year - src.DateOfBirth.Year )));;
            CreateMap<Photo, PhotoForDetailDto>(); 
            CreateMap<Photo, PhotoForReturnDto>(); 
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForUpdateDto,User>();
        }
    }
}